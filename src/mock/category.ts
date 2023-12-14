import type { Category } from '@/types/category'
import type { EntryType } from '@/types/entry'

const defaultOutputCategoryList: Omit<Category, 'type'>[] = [
  {
    label: 'Dining',
    value: 'dining',
    icon: 'ph-fork-knife'
  },
  {
    label: 'Daily Necessities',
    value: 'daily-necessities',
    icon: 'ph-toilet-paper'
  },
  {
    label: 'Coffee',
    value: 'coffee',
    icon: 'ph-coffee'
  },
  {
    label: 'Bike',
    value: 'bike',
    icon: 'ph-bicycle'
  },
  {
    label: 'Takeout',
    value: 'takeout',
    icon: 'ph-hamburger'
  },
  {
    label: 'Pet',
    value: 'pet',
    icon: 'ph-paw-print'
  },
  {
    label: 'Game',
    value: 'game',
    icon: 'ph-game-controller'
  },
  {
    label: 'Movie',
    value: 'movie',
    icon: 'ph-film-slate'
  },
  {
    label: 'Clothes',
    value: 'clothes',
    icon: 'ph-t-shirt'
  },
  {
    label: 'Water',
    value: 'water',
    icon: 'ph-drop'
  },
  {
    label: 'Electricity',
    value: 'electricity',
    icon: 'ph-lightning'
  },
  {
    label: 'Phone',
    value: 'phone',
    icon: 'ph-phone-call'
  },
  {
    label: 'Internet',
    value: 'internet',
    icon: 'ph-wifi-medium'
  },
  {
    label: 'Bus',
    value: 'bus',
    icon: 'ph-bus'
  },
  {
    label: 'Train',
    value: 'train',
    icon: 'ph-train'
  },
  {
    label: 'Plane',
    value: 'plane',
    icon: 'ph-airplane-takeoff'
  },
  {
    label: 'App',
    value: 'app',
    icon: 'ph-app-store-logo'
  },
  {
    label: 'Tech',
    value: 'Tech',
    icon: 'ph-desktop-tower'
  }
]

const defaultInputCategoryList: Omit<Category, 'type'>[] = [
  {
    label: 'Salary',
    value: 'salary',
    icon: 'ph-hammer'
  },
  {
    label: 'Stock',
    value: 'stock',
    icon: 'ph-chart-line-up'
  },
  {
    label: 'Bonus',
    value: 'bonus',
    icon: 'ph-medal'
  },
  {
    label: 'Wool',
    value: 'wool',
    icon: 'ph-piggy-bank'
  }
]
export const defaultCategoryList: Category[] = [
  ...defaultOutputCategoryList.map((category) => ({
    ...category,
    type: 'output' as Exclude<EntryType, 'transfer'>
  })),
  ...defaultInputCategoryList.map((category) => ({
    ...category,
    type: 'input' as Exclude<EntryType, 'transfer'>
  }))
]
