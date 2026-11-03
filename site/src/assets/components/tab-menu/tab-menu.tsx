import { useId, useRef, useState, type KeyboardEvent } from "react";

//CSS
import "./tab-menu.scss";

// Accessible text tabs. `menuItems` keeps its original shape: a Map with one
// entry whose key maps ids to indexes and whose value is the list of
// { id, title, component } items. The item with id "initial" opens first.
function TabMenu({ menuItems }) {
  const menuNamesObj = menuItems.keys().next().value;
  const menuDataArr = menuItems.values().next().value;
  const uid = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [menuState, setMenuState] = useState("initial");
  const selectedIndex = menuNamesObj[menuState] ?? 0;
  const currentSelected = menuDataArr[selectedIndex];

  const select = (index: number, focus = false) => {
    const n = menuDataArr.length;
    const i = ((index % n) + n) % n;
    setMenuState(menuDataArr[i].id);
    if (focus) tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: selectedIndex + 1,
      ArrowLeft: selectedIndex - 1,
      Home: 0,
      End: menuDataArr.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    select(keys[e.key], true);
  };

  return (
    <div className="tabmenu">
      <div className="text-tabs" role="tablist" onKeyDown={onKeyDown}>
        {menuDataArr.map((item, i) => (
          <button
            key={item.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${i}`}
            aria-selected={i === selectedIndex}
            aria-controls={`${uid}-panel`}
            tabIndex={i === selectedIndex ? 0 : -1}
            onClick={item.buttonClick ?? (() => select(i))}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div
        className="menu-content"
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${selectedIndex}`}
      >
        {currentSelected.component}
      </div>
    </div>
  );
}

export default TabMenu;
