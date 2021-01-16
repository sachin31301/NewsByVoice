import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

import logo from './images/logo.png';
import { NewsCards } from './components';
import useStyles from './styles';

const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
 // const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: '5c2ab53b09094d25484083e3f6fae0622e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } 
         else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        <img src="data:image/jpeg;base64,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" className={classes.alanLogo} alt="logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
     
      {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://www.linkedin.com/in/sachin-sharma-976142179/"> Sachin Sharma</a> -
            
          </Typography>
          <img className={classes.image} src={logo} height="50px" alt="JSMastery logo" />
        </div>
      ) : null}
    </div>
  );
};

export default App;