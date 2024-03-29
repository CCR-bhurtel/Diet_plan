import { React, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/window/window.css';

export default function MoreWindow(props) {
  // BACKGROUND EFFECTS
  useEffect(() => {
    const wrapper = document.querySelector('#root');
    const iframe = document.querySelector('.window__main__section__iframe');

    wrapper.style.filter = 'blur(5px) opacity(40%) grayscale(100%)';
    wrapper.style.pointerEvents = 'none';
    setTimeout(() => {
      iframe.style.opacity = '1';
    }, 500);

    return () => {
      wrapper.style.filter = 'blur(0px) opacity(100%) grayscale(0%)';
      wrapper.style.pointerEvents = 'auto';
    };
  }, []);

  const handleBackButton = () => {
    props.handleMoreWindow();
  };

  return ReactDOM.createPortal(
    <div className="window window--more">
      <header className="window__header">
        <h2 className="window__header__heading">{props.title}</h2>
      </header>

      <main className="window__main">
        <section className="window__main__section">
          <h3 className="window__main__section__title">Description</h3>
          <p style={{ color: 'white' }} className="window__main__section__text">
            {props.description}
          </p>
        </section>

        <section className="window__main__section window__main__section--halfed">
          <aside className="window__main__section__split-left">
            <h3 className="window__main__section__title">Difficulty</h3>
            <div
              className="exercise__top-section__grade-container"
              style={{ marginBottom: '15px' }}
            >
              <span className="exercise__top-section__grade-container__point exercise__top-section__grade-container__point--filled"></span>
              <span
                className={
                  props.difficulty >= 2
                    ? 'exercise__top-section__grade-container__point exercise__top-section__grade-container__point--filled'
                    : 'exercise__top-section__grade-container__point'
                }
              ></span>
              <span
                className={
                  props.difficulty === 3
                    ? 'exercise__top-section__grade-container__point exercise__top-section__grade-container__point--filled'
                    : 'exercise__top-section__grade-container__point'
                }
              ></span>
            </div>
            <p
              style={{ color: 'white' }}
              className="window__main__section__text"
            >
              {props.typeOfExercise}
            </p>
          </aside>
          <aside className="window__main__section__split-right">
            <h3 className="window__main__section__title">Muscles</h3>
            <ul className="window__main__section__list">
              {props.muscles.map((muscle, index) => {
                return (
                  <li
                    key={index}
                    style={{ color: 'white' }}
                    className="window__main__section__list__item"
                  >
                    {muscle}
                  </li>
                );
              })}
            </ul>
          </aside>
        </section>

        <section className="window__main__section">
          <h3 className="window__main__section__title">Proper form</h3>
          <iframe
            className=""
            allowFullScreen
            width="100%"
            height="300px"
            src={props.properFormLink}
          ></iframe>
        </section>
      </main>

      <section className="window__bottom">
        <div></div>
        <button
          className="window__bottom__primary-button"
          type="button"
          onClick={handleBackButton}
        >
          Back
        </button>
      </section>
    </div>,
    document.getElementById('portal')
  );
}
