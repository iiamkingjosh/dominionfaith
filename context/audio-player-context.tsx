'use client'

import {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import type { AudioEpisode, PlayerState, PlaybackSpeed } from '@/types/audio'

// ── Actions ────────────────────────────────────────────────────

type Action =
  | { type: 'PLAY'; episode: AudioEpisode }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'SEEK'; time: number }
  | { type: 'SET_VOLUME'; volume: number }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'SET_SPEED'; speed: PlaybackSpeed }
  | { type: 'SET_EXPANDED'; expanded: boolean }
  | { type: 'ADD_TO_QUEUE'; episode: AudioEpisode }
  | { type: 'REMOVE_FROM_QUEUE'; id: string }
  | { type: 'PLAY_NEXT' }
  | { type: 'UPDATE_TIME'; currentTime: number; duration: number }
  | { type: 'SET_STATUS'; status: PlayerState['status'] }

const initialState: PlayerState = {
  current: null,
  queue: [],
  status: 'idle',
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  muted: false,
  speed: 1,
  expanded: false,
}

function reducer(state: PlayerState, action: Action): PlayerState {
  switch (action.type) {
    case 'PLAY':
      return {
        ...state,
        current: action.episode,
        status: 'loading',
        currentTime: 0,
        queue: state.queue.filter(e => e.id !== action.episode.id),
      }
    case 'TOGGLE_PLAY':
      if (!state.current) return state
      return { ...state, status: state.status === 'playing' ? 'paused' : 'playing' }
    case 'SEEK':
      return { ...state, currentTime: action.time }
    case 'SET_VOLUME':
      return { ...state, volume: action.volume, muted: action.volume === 0 }
    case 'TOGGLE_MUTE':
      return { ...state, muted: !state.muted }
    case 'SET_SPEED':
      return { ...state, speed: action.speed }
    case 'SET_EXPANDED':
      return { ...state, expanded: action.expanded }
    case 'ADD_TO_QUEUE': {
      if (state.queue.some(e => e.id === action.episode.id)) return state
      return { ...state, queue: [...state.queue, action.episode] }
    }
    case 'REMOVE_FROM_QUEUE':
      return { ...state, queue: state.queue.filter(e => e.id !== action.id) }
    case 'PLAY_NEXT': {
      if (state.queue.length === 0) return { ...state, status: 'idle', currentTime: 0 }
      const [next, ...rest] = state.queue
      return { ...state, current: next, queue: rest, status: 'loading', currentTime: 0 }
    }
    case 'UPDATE_TIME':
      return { ...state, currentTime: action.currentTime, duration: action.duration }
    case 'SET_STATUS':
      return { ...state, status: action.status }
    default:
      return state
  }
}

// ── Context ────────────────────────────────────────────────────

interface AudioPlayerContextValue {
  state: PlayerState
  play: (episode: AudioEpisode) => void
  togglePlay: () => void
  seek: (time: number) => void
  skip: (seconds: number) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  setSpeed: (speed: PlaybackSpeed) => void
  setExpanded: (expanded: boolean) => void
  addToQueue: (episode: AudioEpisode) => void
  removeFromQueue: (id: string) => void
  playNext: () => void
}

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null)

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext)
  if (!ctx) throw new Error('useAudioPlayer must be used within AudioPlayerProvider')
  return ctx
}

// ── Provider ───────────────────────────────────────────────────

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const stateRef = useRef(state)
  stateRef.current = state

  // Initialise the Audio element once (client-side only)
  useEffect(() => {
    const audio = new Audio()
    audioRef.current = audio

    const onTimeUpdate = () => {
      dispatch({ type: 'UPDATE_TIME', currentTime: audio.currentTime, duration: audio.duration || 0 })
    }
    const onEnded = () => dispatch({ type: 'PLAY_NEXT' })
    const onCanPlay = () => dispatch({ type: 'SET_STATUS', status: stateRef.current.status === 'loading' ? 'playing' : stateRef.current.status })
    const onError = () => dispatch({ type: 'SET_STATUS', status: 'error' })

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('error', onError)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('error', onError)
    }
  }, [])

  // Sync current episode → audio src
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !state.current) return
    audio.src = state.current.audioUrl
    audio.load()
    audio.play().catch(() => {})
  }, [state.current?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Sync play/pause
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (state.status === 'playing') audio.play().catch(() => {})
    else if (state.status === 'paused') audio.pause()
  }, [state.status])

  // Sync volume & mute
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = state.volume
    audio.muted = state.muted
  }, [state.volume, state.muted])

  // Sync playback speed
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.playbackRate = state.speed
  }, [state.speed])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      const s = stateRef.current
      if (!s.current) return
      if (e.code === 'Space') { e.preventDefault(); dispatch({ type: 'TOGGLE_PLAY' }) }
      if (e.code === 'ArrowRight') { e.preventDefault(); dispatch({ type: 'SEEK', time: Math.min(s.currentTime + 15, s.duration) }) }
      if (e.code === 'ArrowLeft') { e.preventDefault(); dispatch({ type: 'SEEK', time: Math.max(s.currentTime - 15, 0) }) }
      if (e.code === 'KeyM') dispatch({ type: 'TOGGLE_MUTE' })
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  // Sync seek → audio element
  const lastSeekTime = useRef<number | null>(null)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (lastSeekTime.current !== state.currentTime && Math.abs((audio.currentTime) - state.currentTime) > 1) {
      audio.currentTime = state.currentTime
    }
  }, [state.currentTime])

  const play = useCallback((episode: AudioEpisode) => dispatch({ type: 'PLAY', episode }), [])
  const togglePlay = useCallback(() => dispatch({ type: 'TOGGLE_PLAY' }), [])
  const seek = useCallback((time: number) => {
    lastSeekTime.current = time
    dispatch({ type: 'SEEK', time })
    if (audioRef.current) audioRef.current.currentTime = time
  }, [])
  const skip = useCallback((seconds: number) => {
    const newTime = Math.max(0, Math.min(stateRef.current.currentTime + seconds, stateRef.current.duration))
    seek(newTime)
  }, [seek])
  const setVolume = useCallback((volume: number) => dispatch({ type: 'SET_VOLUME', volume }), [])
  const toggleMute = useCallback(() => dispatch({ type: 'TOGGLE_MUTE' }), [])
  const setSpeed = useCallback((speed: PlaybackSpeed) => dispatch({ type: 'SET_SPEED', speed }), [])
  const setExpanded = useCallback((expanded: boolean) => dispatch({ type: 'SET_EXPANDED', expanded }), [])
  const addToQueue = useCallback((episode: AudioEpisode) => dispatch({ type: 'ADD_TO_QUEUE', episode }), [])
  const removeFromQueue = useCallback((id: string) => dispatch({ type: 'REMOVE_FROM_QUEUE', id }), [])
  const playNext = useCallback(() => dispatch({ type: 'PLAY_NEXT' }), [])

  return (
    <AudioPlayerContext.Provider value={{
      state, play, togglePlay, seek, skip, setVolume, toggleMute,
      setSpeed, setExpanded, addToQueue, removeFromQueue, playNext,
    }}>
      {children}
    </AudioPlayerContext.Provider>
  )
}
