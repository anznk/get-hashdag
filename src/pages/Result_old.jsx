import axios from 'axios';
import { useEffect, useState } from 'react';
import "../assets/styles/result.scss"
import {CurrentTweet, SelectedTweets} from "../components";
// import {CurrentTweet} from "../components";
// import CurrentTweet from "../components";


const Result = () => {
    const [searchTag, setSearchTag ] = useState();
    const [tweets, setTweets ] = useState([]);
    const [selectedTweets, setSelectedTweets ] = useState([]);
    
    let flag = false;
    async function fetchData() {
      // get Search word
      const res = await axios.get(`http://localhost:3000/results`, {mode: 'cors'});
      const items = res.data;
      if (items.length) {
        // sort
        const value = items.sort(function (a, b) {
          return b.date - a.date;
        });
        setSearchTag(value[0].searchtag);
      }
    }

    async function fetchTweets(keyword) {
      // console.log("keyword", keyword);
      // get tweet with search word
      const tweets = await axios.get('http://localhost:3000/searchtweets?searchtag='+keyword, {
        // query URL without using browser cache
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
      const data = tweets.data;
      // console.log("data", data);
      if(data){
        setTweets(data);
      }
    }

  useEffect(() => {
    // call fetchTweerts once
    // if (tweets.length) {
    //   return;
    // }
    fetchTweets("Vancouver");
    // if(flag === false){
      // first time
      // fetchData();
      // if(searchTag){
        // fetchTweets(searchTag);
      // }
    //   flag = true;
    //   return;
    // }

    // const interval = setInterval(() => {
    //   console.log("timer");
    //   fetchData();
    //   if(searchTag){
    //     fetchTweets(searchTag);
    //   }
    // }, 10000);
    // return () => clearInterval(interval)
  // }, [tweets, searchTag]);
  }, []);

  const addTweets = event => {
    // console.log("event", event);
    setSelectedTweets([...selectedTweets, tweets[event]]);   
    tweets.splice(event, 1);
    // setTweets(...tweets, tweets);
    // console.log("tweets", tweets);
  }
  // const deleteTweets = event => {
  //   setTweets([...tweets, selectedTweets[event]]);  
  //   selectedTweets.splice(event, 1);  
  //   setSelectedTweets([...selectedTweets, selectedTweets]);
  //   // console.log("selectedTweets", selectedTweets);
  // }

  return (
    <div className="main">
      <h1># 　{searchTag}</h1>
    <ol className="feed">{
      tweets && (
      tweets.map((tweet, i) => {
        return (
          <li key={ i } className="tweet" onClick={() => addTweets(i)}>
            <p className="tweet_name">@{tweet.user_name}</p>
            <p className="tweet_text">{ tweet.text }</p>
            <p className="tweet_created_at">{tweet.created_at}</p>
          </li>
        )
      })
      )
      }</ol>

    {/* selected tweets */}
    {/* <ol className="feed">{
      selectedTweets && (
      selectedTweets.map((selectedTweet, i) => {
        return (
          <li key={ i } className="tweet" onClick={() => deleteTweets(i)}>
            <p className="tweet_name">{selectedTweet.user_name}</p>
            <p className="tweet_text">{ selectedTweet.text }</p>
            <p className="tweet_created_at">{selectedTweet.created_at}</p>
          </li>
        )
      })
      )
    }</ol> */}
    <div className="feed">
    <SelectedTweets selected={selectedTweets} setSelectedTweets={setSelectedTweets}/>
    </div>
    {/* <div className="feed">
    <CurrentTweet selected={selectedTweets} setSelectedTweets={setSelectedTweets}/>
    </div> */}
    </div>
    
    
  )
}

export default Result