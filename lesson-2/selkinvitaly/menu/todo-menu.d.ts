type menuList = { title: string, items?: menuList }[];

interface IMenu {
  init(): void;
  state: string;
  destroy(): void;
  toggle(label: string): void;
  open(label: string): void;
  close(label: string): void;
  getContainer(): HTMLElement;
}
