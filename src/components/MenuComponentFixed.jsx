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
  const [expanded, setExpanded] = useState(false);

  const clickHandler = () => {
    setMenuOpened(prevState => !prevState);
    setExpanded(prevState => !prevState);
  }

  return (
    <div className="demo-menu">
      <button className="menu-toggle button" onClick={clickHandler} aria-expanded={expanded} aria-haspopup="true" aria-controls="menu-nav">
        { menuOpened ? 'Close menu' : 'Open menu' }
      </button>

      <nav id="menu-nav" className={ menuOpened ? 'show' : 'hide' }>
        <ul className="justify-start">
          {dummyLinks.map((item) => {
            return (
              <li className="p-1" key={item.id}>
                <a
                  to={item.link}
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
