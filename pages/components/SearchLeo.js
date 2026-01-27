import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef
} from "react";
import {
  InstantSearch,
  SearchBox,
  Configure,
  useInfiniteHits,
} from "react-instantsearch";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import styles from "./Search.module.css";
import { Masonry } from "masonic";
import Hit from "./Hit";
import Image from "next/image";
import Link from "next/link";
import { history } from "instantsearch.js/es/lib/routers";
import KeywordButtons from "./KeywordButtons";

const InfiniteHits = () => {
  const { hits, isLastPage, showMore } = useInfiniteHits();
  const sentinelRef = useRef(null);

  const observerCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLastPage) {
          showMore();
        }
      });
    },
    [isLastPage, showMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback);

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [observerCallback]);

  return (
    <>
      <div className={styles.masonic}>
        <Masonry
          key={hits.length}
          items={hits}
          render={({ data: hit }) => <Hit key={hit.objectID} hit={hit} />}
          columnWidth={180}
          columnGutter={10}
        />
        {hits.length === 0 && (
          <div className={styles.searchfail}>
            <Link
              href="https://infinitememe.lol"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/sorry-bro-no-meme.png"
                alt="Sorry bro, haven't found a meme yet."
                width={200}
                height={200}
                priority
                placeholder="blur"
                blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOUOsNQDwADVQFnOkczwQAAAABJRU5ErkJggg=="
              />
            </Link>
          </div>
        )}
      </div>
      <div
        ref={sentinelRef}
        style={{
          textAlign: "center",
          visibility: isLastPage ? "visible" : "hidden",
        }}
      ></div>
    </>
  );
};

const SearchLeo = () => {
  const [inputActive, setInputActive] = useState(false);
  const indexName = "leo";
  const [randomRange, setRandomRange] = useState({ min: 0, max: 999999 });

  useEffect(() => {
    const min = Math.floor(Math.random() * 500000);
    const max = min + 500000;
    setRandomRange({ min, max });
  }, []);

  const searchClient = useMemo(
    () =>
      new TypesenseInstantSearchAdapter({
        server: {
          nodes: [
            {
              host: "abvwif8oj0e3r7kup-1.a1.typesense.net",
              port: "443",
              protocol: "https",
            },
          ],
          apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_SEARCH_ONLY,
          cacheSearchResultsForSeconds: 120,
        },
        additionalSearchParameters: {
          query_by:
            "image_text,image_type,image_character,image_object,image_content,image_color",
          sort_by: "random_sort_field:desc,_text_match:desc",
          filter_by: `random_sort_field:=[${randomRange.min}..${randomRange.max}]`,
        },
      }).searchClient,
    [randomRange]
  );

  const routing = useMemo(
    () => ({
      router: history({ cleanUrlOnDispose: false }),
      stateMapping: {
        stateToRoute(uiState) {
          const indexUiState = uiState[indexName];
          return { search: indexUiState.query };
        },
        routeToState(routeState) {
          return { [indexName]: { query: routeState.search } };
        },
      },
    }),
    [indexName]
  );

  return (
    <InstantSearch
      indexName={indexName}
      searchClient={searchClient}
      routing={routing}
      future={{ preserveSharedStateOnUnmount: true }}
    >
      <Configure hitsPerPage={40} />
      <div className={styles.searchAndKeywordsContainer}>
        <div className={styles.searchBarContainer}>
          <div className={styles.logoLeft}>
            <a href="https://magi.lol/">
              <Image
                src={"/magi-logo.png"}
                alt="Magi Logo"
                width={100}
                height={100}
                priority
                className={styles.spinHover}
              />
            </a>
          </div>
          <div className={styles.searchBoxContainer}>
            <SearchBox
              classNames={{
                root: styles.searchBoxRoot,
                form: styles.searchBoxForm,
                input: `${styles.searchBoxInput} ${
                  inputActive ? styles.active : ""
                }`,
                submit: styles.searchBoxSubmit,
                reset: styles.searchBoxReset,
                loadingIndicator: styles.searchBoxLoadingIndicator,
                submitIcon: styles.searchBoxSubmitIcon,
                resetIcon: styles.searchBoxResetIcon,
                loadingIcon: styles.searchBoxLoadingIcon,
              }}
              autoFocus
              placeholder={`Search for memes`}
              onFocus={() => setInputActive(true)}
            />
          </div>
        </div>
        <KeywordButtons />
      </div>
      <InfiniteHits />
    </InstantSearch>
  );
};

export default SearchLeo;
