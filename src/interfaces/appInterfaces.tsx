import {RootStackParams} from '../navigator/Tab1';

type ComponentKey = keyof RootStackParams;

export interface MenuItem {
  name: string;
  icon: string;
  component: ComponentKey;
}
