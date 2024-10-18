import { useState } from 'react';

const dummyLinks = [
  {
    'link': '/',
    'name': 'Link 1',
    'id': 'dummy-1'
  },
  {
    'link': '/',
    'name': 'Link 2',
    'id': 'dummy-2'
  },
  {
    'link': '/',
    'name': 'Link 3',
    'id': 'dummy-3'
  },
];

export default function MenuComponent() {

  const [menuOpened, setMenuOpened] = useState(false);

  const clickHandler = () => {
    setMenuOpened(prevState => !prevState);
  }

  return (
    <div className="demo-menu mb-4">
      <button className="menu-toggle button" onClick={clickHandler}>
        { menuOpened ? 'Close menu' : 'Open menu' }
      </button>

      <nav className={ menuOpened ? 'show' : 'hide' }>
        <ul className="justify-start">
          {dummyLinks.map((item) => {
            return (
              <li className="p-1" key={item.id}>
                <a
                  href={item.link}
                >
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
