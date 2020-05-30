import React, {useEffect, useState} from 'react';
import './App.css';

export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffle<T>(array: T[]) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const sites = [
  {
    name: 'Black Visions Donations',
    url: 'https://secure.everyaction.com/4omQDAR0oUiUagTu0EG-Ig2',
  },
  {
    name: 'Reclaim the Block',
    url: 'https://secure.everyaction.com/zae4prEeKESHBy0MKXTIcQ2',
  },
  {
    name: 'Louisville Community Bail Fund',
    url:
      'https://actionnetwork.org/fundraising/louisville-community-bail-fund?source=twitter&',
  },
  {
    name: 'North Star Health Collective',
    url: 'https://www.northstarhealthcollective.org/donate',
  },
  {
    name: 'Brooklyn Community Bail Fund',
    url: 'https://brooklynbailfund.org/donation-form',
  },
  {
    name: 'Columbus Freedom Fund',
    url: 'https://www.paypal.me/columbusfreedomfund',
  },
  {
    name: 'George Floyd Memorial Fund',
    url: 'https://www.gofundme.com/f/georgefloyd',
  },
];

shuffle(sites);

const renderTri = (
  context: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  fillColor: string,
  strokeColor: string,
) => {
  context.lineWidth = 8;
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineTo(x3, y3);
  context.closePath();
  context.fillStyle = fillColor;
  context.fill();
  context.strokeStyle = strokeColor;
  context.stroke();
};

export const randomizeTriFavicon = (palette: string[]) => {
  let favicon = document.querySelectorAll('link[rel="icon"]')[0];
  let faviconSize = 96;

  let img = document.createElement('img');
  // @ts-ignore
  img.src = favicon.href;

  img.onload = () => {
    let canvas = document.createElement('canvas');
    canvas.width = faviconSize;
    canvas.height = faviconSize;

    let context = canvas.getContext('2d');
    if (context !== null) {
      renderTri(
        context,
        2,
        2,
        2,
        canvas.height - 2,
        canvas.width - 2,
        2,
        palette[randInt(0, palette.length)],
        palette[randInt(0, palette.length)],
      );
      renderTri(
        context,
        2,
        canvas.height - 2,
        canvas.height - 2,
        2,
        canvas.width - 2,
        canvas.height - 2,
        palette[randInt(0, palette.length)],
        palette[randInt(0, palette.length)],
      );

      // Replace favicon
      // @ts-ignore
      favicon.href = canvas.toDataURL('image/png');
    }
  };
};
const palette = [
  '#000000',
  '#000000',
  '#f8dd13',
  '#f978cf',
  '#699bb6',
  '#fb410f',
  '#f63f14',
  '#dc4b9f',
  '#1080d9',
  '#707a7d',
  '#1c6ec6',
  '#a53744',
  '#4a4b57',
  '#171714',
  '#151517',
  '#10100f',
];

randomizeTriFavicon(palette);

function App() {
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    setTimeout(() => {
      randomizeTriFavicon(palette);
      if (secondsLeft > 1) {
        setSecondsLeft(secondsLeft - 1);
      } else {
        window.location.replace(sites[0].url);
      }
    }, 1000);
  });

  return (
    <div className="App">
      <header className="App-header">
        <div className="block">
          <div className="first">Randomly redirecting to</div>
          <div className="second">
            {sites.map((site, i) => (
              <div className="url">
                <a
                  className={i > 0 ? 'deselected' : undefined}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer">
                  {site.name}
                </a>
                {i === 0 && (
                  <span className="padded">
                    in {secondsLeft} {secondsLeft !== 1 ? 'seconds' : 'second'}.
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </header>
      <footer>
        Sources:{' '}
        <a
          href="https://twitter.com/seanmiura/status/1266399116797468673?s=20"
          target="_blank"
          rel="noopener noreferrer">
          [1]
        </a>
        ,{' '}
        <a
          href="https://twitter.com/BKBailFund/status/1266523954669408257?s=20"
          target="_blank"
          rel="noopener noreferrer">
          [2]
        </a>
        ,{' '}
        <a
          href="https://twitter.com/NifMuhammad/status/1266365680854740992?s=20"
          target="_blank"
          rel="noopener noreferrer">
          [3]
        </a>
      </footer>
    </div>
  );
}

export default App;
