import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../Home/Header";
import newsstyles from "./News.module.css";
import Search from "./SearchNews";
import { randomqueries } from "./randomqueries";
import ReactPaginate from "react-paginate";
let query = "mental-health+OR+literature+OR+vacation";

const News2 = () => {
  const [data, setData] = useState();
  const [term, setTerm] = useState("");
  const [suggesting, setSuggesting] = useState(true);
  const [otherarticles, setotherarticles] = useState(false);
  const [page, setPage] = useState(1);
  const articlesperpage = 16;
  const [totalresults, settotalresults] = useState(100);
  const sortBy = ["relevancy", "popularity", "publishedAt"];
  const [articlesVisited, setarticlesVisited] = useState(0);
  useEffect(() => {
    setarticlesVisited((Number(page) - 1) * articlesperpage);
    if (page > 3) {
      setSuggesting(false);
      setotherarticles(true);
      setTerm("");
    } else {
      setSuggesting(true);
    }
  }, [page]);
  useEffect(() => {
    const token1 = JSON.parse(localStorage.getItem("token"));
    let queryTerm;
    var axios = require("axios").default;
    if (suggesting) {
      axios.get(`/api/v1/profile`, {
          headers: {
            authorization: `Bearer ${token1}`,
          },
        })
        .then((res) => {
          const { Keywords } = res.data.data;
          const temp = Object.entries(Keywords);
          temp.sort((a, b) => b[1] - a[1]);
          query = temp.slice(0, 3);
          queryTerm = `${query[0][0]}+OR+${query[1][0]}+OR+${query[2][0]}`;
          settotalresults(res.data.totalResults);
          console.log("totalresults-" + totalresults);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
            return;
          }
          console.log(err);
        });
      let sortby = sortBy[Math.floor(Math.random() % sortBy.length)];
      const token = JSON.parse(localStorage.getItem("token"));
      var axios = require("axios").default;
      var options = {
        method: "GET",
        url: "https://bing-news-search1.p.rapidapi.com/news",
        params: {
          q: { queryTerm },
          count: "20",
          sortBy: { sortby },
          setLang: "english",
          textFormat: "Raw",
          safeSearch: "Strict",
        },
        headers: {
          "accept-language": "english",
          "x-bingapis-sdk": "true",
          "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
          "x-rapidapi-key":
            "58cf773c4cmshce14a05c016cf8cp15c782jsnb2c454aae6d8",
        },
      };
      axios
        .request(options)
        .then(function (response) {
          setData(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else if (otherarticles) {
      const otherterm = randomqueries[Math.floor(Math.random() % randomqueries.length)];
      let sortby = sortBy[Math.floor(Math.random() % sortBy.length)];
       var axios = require("axios").default;
      var options = {
        method: "GET",
        url: "https://bing-news-search1.p.rapidapi.com/news",
        params: {
          q: { otherterm },
          count: "20",
          sortBy: { sortby },
          setLang: "english",
          textFormat: "Raw",
          safeSearch: "Strict",
        },
        headers: {
          "accept-language": "english",
          "x-bingapis-sdk": "true",
          "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
          "x-rapidapi-key":
            "58cf773c4cmshce14a05c016cf8cp15c782jsnb2c454aae6d8",
        },
      };
      axios
        .request(options)
        .then(function (response) {
          setData(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [page]);
  useEffect(() => {
    if (term) {
      const queryTerm = term.split(" ").join("-");
      setSuggesting(false);
      setotherarticles(false);
      let sortby = sortBy[Math.floor(Math.random() % sortBy.length)];
      const token = JSON.parse(localStorage.getItem("token"));
      var axios = require("axios").default;
      var options = {
        method: "GET",
        url: "https://bing-news-search1.p.rapidapi.com/news",
        params: {
          q: { queryTerm },
          count: "20",
          sortBy: { sortby },
          setLang: "english",
          textFormat: "Raw",
          safeSearch: "Strict",
        },
        headers: {
          "accept-language": "english",
          "x-bingapis-sdk": "true",
          "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
          "x-rapidapi-key":
            "58cf773c4cmshce14a05c016cf8cp15c782jsnb2c454aae6d8",
        },
      };
      axios
        .request(options)
        .then(function (response) {
          setData(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [term, page]);
  const changePage = ({ selected }) => {
    setPage(selected);
  };
  return (
    <>
      <Header />
      <div className={newsstyles.showcase}>
        <div className={newsstyles.overlay + " " + "px-5"}>
          <div className="text-4xl font-bold text-white mb-4 text-center">
            <h1>News Articles</h1>
          </div>
          <Search
            searchtext={(text) => {
              setTerm(text);
            }}
            className="px-5 pt-10 pb-20 "
          />
        </div>
      </div>
      <div className={newsstyles.bodyy}>
        {suggesting ? (
          <h4 className="px-5 pt-10 pb-20 ">Suggested articles:</h4>
        ) : otherarticles ? (
          <h4 className="px-5 pt-10 pb-20 ">Other articles :</h4>
        ) : (
          <h4 className="px-5 pt-10 pb-20 ">Search Results for {term} :</h4>
        )}
        <div className={newsstyles.all__news}>
          {data
            ? data.value.map((news) => (
                <div className={newsstyles.news}>
                  <img
                    src={news.image.thumbnail.contentUrl}
                    className={newsstyles.news__image}
                    alt="Not Found"
                    onerror="this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX9JgRB8c-unjPmV8cuIw2S_kGq3uMI21CkA&usqp=CAU'"
                  />
                  <div className={`${newsstyles.contentWrapper}`}>
                    <h3 className={newsstyles.news__title}>{news.name}</h3>
                    <p className={newsstyles.news__desc}>
                      {news.description}
                      <a
                        href={news.url}
                        className={newsstyles.readmore}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        Read more{" "}
                      </a>
                    </p>
                    <span className={newsstyles.news__author}>
                      {news.provider[0].name}
                    </span>{" "}
                    <br />
                    <span className={newsstyles.news__published}>
                      {news.datePublished}
                    </span>
                    <span className={newsstyles.news__source}>
                      {news.provider[0].name}
                    </span>
                  </div>
                </div>
              ))
            : "Loading"}
        </div>
        <br />
        <br />
        <ReactPaginate
          style={{ margin: "auto" }}
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={7}
          onPageChange={changePage}
          containerClassName={newsstyles.paginationBttns}
          previousLinkClassName={newsstyles.previousBttn}
          nextLinkClassName={newsstyles.nextBttn}
          disabledClassName={newsstyles.paginationDisabled}
          activeClassName={newsstyles.paginationActive}
        />
      </div>
    </>
  );
};
export default News2;
