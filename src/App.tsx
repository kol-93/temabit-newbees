import React, {
  useEffect,
  useState,
  useMemo,
  DependencyList,
  Dispatch,
  SetStateAction,
  useCallback,
  DispatchWithoutAction,
} from 'react';
import { LABEL } from './enums';
import logo from './logo.svg';
import './App.css';

interface MyComponentProps {

}

function useMyMemo<T>(f: () => T, deps: DependencyList): [T, Dispatch<SetStateAction<T>>, DispatchWithoutAction] {
  const [state, setState] = useState(f);
  const [render, setRender] = useState(0);
  useEffect(() => {
    console.log('EFFECT', render);
    if (render === 0) {
      return () => {
        setRender((render) => render + 1);
      };
    } else {
      console.log('RECALC');
      setState(f);
    }
  }, [...deps, render]);
  const refresh = useCallback(() => {
    setRender((render) => render + 1);
  }, []);
  return [state, setState, refresh];
}


const MyComponent: React.FC<MyComponentProps> = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const listener =  () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);
  // const [innerWidth, setInnerWidth] = useState(width / 2);
  // useEffect(() => {
  //   setInnerWidth(width / 2);
  // }, [width]);
  //
  const [innerWidth, setInnerWidth, refresh] = useMyMemo(() => {
    console.log('CALCULATE');
    return width / 2;
  }, [width]);

  const onManualWidthClick = useCallback(() => {
    setInnerWidth(200);
  }, []);

  const onAutoWidthClick = useCallback(() => {
    refresh();
  }, []);


  const _children: React.ReactNode[] = children instanceof Array ? children : [children];
  if (0 <= width && width < 600) {
    return <div style={{ width: innerWidth }}>{_children[0]}<button onClick={onManualWidthClick}>ManualWidth</button><button onClick={onAutoWidthClick}>AutoWidth</button></div>;
  } else {
    return <div style={{ width: innerWidth }}>{_children}<button onClick={onManualWidthClick}>ManualWidth</button><button onClick={onAutoWidthClick}>AutoWidth</button></div>;
  }
};


export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>{LABEL.LABEL_DO_SOMETHING}</code> and save to reload.
        </p>
        <MyComponent>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {LABEL.LABEL_DO_SOMETHING}
          </a>
          <br />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {LABEL.LABEL_DO_SOMETHING}
          </a>
        </MyComponent>
      </header>
    </div>
  );
}
