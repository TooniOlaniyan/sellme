import { Fragment } from "react";
import { Menu } from "@headlessui/react";
import Image from "next/image";

type Props = {
  title: string;
  state: string;
  setState: (value: string) => void;
  filters: Array<string>;
};
const CustomMenu = ({ title, state, setState, filters }: Props) => {
  return (
    <div className="flexStart flex-col w-full gap-7 relative">
      <label htmlFor={title} className="w-full text-gray-100">
        {title}
      </label>
      <Menu as="div" className="self-start relative">
        <div>
          <Menu.Button className="flexCenter custom_menu-btn">
            {state || "select Category"}
            <Image
              src="/arrow-down.svg"
              alt="arrow-down"
              width={10}
              height={5}
            />
          </Menu.Button>
        </div>
        <Menu.Items className="flexStart custom_menu-items">
          {filters.map((tag) => (
            <Menu.Item key={tag}>
              <button
                className="custom_menu-item"
                type="button"
                value={tag}
                onClick={(e) => setState(e.currentTarget.value)}
              >
                {tag}

              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default CustomMenu;
