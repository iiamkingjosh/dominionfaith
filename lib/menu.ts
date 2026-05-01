import { firebaseQuery, getCollection } from './firebase';

export interface SubMenuItem {
  label: string;
  href: string;
}

export interface MenuItem {
  label: string;
  href: string;
  order?: number;
  submenu?: SubMenuItem[];
}

const FALLBACK_MENU_PATH = '/menu.json';

export async function fetchMenuItems(): Promise<MenuItem[]> {
  const cmsUrl = import.meta.env.VITE_MENU_API_URL;

  try {
    if (!cmsUrl) {
      const firestoreItems = await getCollection<MenuItem>('menu_items', [
        firebaseQuery.orderBy('order', 'asc'),
      ]);

      if (firestoreItems.length > 0) {
        return firestoreItems;
      }

      throw new Error('No Firestore menu items found.');
    }

    const response = await fetch(cmsUrl, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Menu fetch failed: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as MenuItem[];
    return data;
  } catch (error) {
    console.warn('Could not load menu from CMS, reverting to local menu.json.', error);
    const fallbackResponse = await fetch(FALLBACK_MENU_PATH, { cache: 'no-store' });
    return (await fallbackResponse.json()) as MenuItem[];
  }
}
