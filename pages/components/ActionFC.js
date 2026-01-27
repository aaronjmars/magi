import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  InstantSearch,
  SearchBox,
  Configure,
  useInfiniteHits,
  useSearchBox,
} from "react-instantsearch";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import styles from "./ActionFC.module.css";
import { Masonry } from "masonic";
import Image from "next/image";
import { history } from "instantsearch.js/es/lib/routers";

const searchPlaceholders = [
  "gm",
  "Meme",
  "Elon",
  "Cartoon",
  "Twitter",
  "Dog",
  "Pepe",
  "Anime",
  "SpongeBob",
  "Computer",
  "Cat",
  "Simpson",
  "Weekend",
  "Job",
  "Crypto",
  "Farcaster",
  "Degen",
  "Moxie",
];

const KeywordButtons = () => {
  const [keywords, setKeywords] = useState([]);
  const { refine } = useSearchBox();

  useEffect(() => {
    const randomKeywords = [...searchPlaceholders]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    setKeywords(randomKeywords);
  }, []);

  const handleKeywordClick = (keyword) => {
    refine(keyword);
  };

  return (
    <div className={styles.keywordButtonsContainer}>
      {keywords.map((keyword, index) => (
        <button
          key={index}
          className={styles.keywordButton}
          onClick={() => handleKeywordClick(keyword)}
          data-umami-event={"ActionKeywordClick"}
        >
          {keyword}
        </button>
      ))}
    </div>
  );
};

const MemeHit = ({ hit, onSelect }) => (
  <div
    className={styles.memeHit}
    onClick={() => {
      onSelect(hit);
      if (window.umami) {
        window.umami.track("ActionImageClick");
      }
    }}
  >
    <Image
      src={hit.image_url}
      alt={hit.cast_caption || "Meme"}
      width={180}
      height={180}
      layout="responsive"
    />
  </div>
);

const InfiniteHits = ({ onMemeSelect }) => {
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
          render={({ data: hit }) => (
            <MemeHit key={hit.objectID} hit={hit} onSelect={onMemeSelect} />
          )}
          columnWidth={180}
          columnGutter={10}
        />
        {hits.length === 0 && (
          <div className={styles.searchfail}>
            <Image
              src="/sorry-bro-no-meme.png"
              alt="Sorry bro, haven't found a meme yet."
              width={200}
              height={200}
              priority
              placeholder="blur"
              blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOUOsNQDwADVQFnOkczwQAAAABJRU5ErkJggg=="
            />
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

const instances = [
  { name: "magi-farcaster", iconUrl: "/farcaster-logo.png" },
  { name: "magi-degen", iconUrl: "/degen.png" },
  { name: "magi-higher", iconUrl: "/higher.png" },
  { name: "magi-enjoy", iconUrl: "/enjoy.png" },
];

const InstanceSwitcher = ({ instance, onInstanceChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentInstanceData =
    instances.find((inst) => inst.name === instance) || instances[0];

  const handleInstanceClick = (selectedInstance) => {
    onInstanceChange(selectedInstance.name);
    setIsOpen(false);
  };

  return (
    <div className={styles.instanceSwitcher}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.switcherButton}
      >
        <Image
          src={currentInstanceData.iconUrl}
          alt={currentInstanceData.name.replace("magi-", "")}
          width={48}
          height={48}
        />
      </button>
      {isOpen && (
        <div className={styles.instanceMenu}>
          {instances.map((inst) => (
            <button
              key={inst.name}
              className={styles.instanceOption}
              onClick={() => handleInstanceClick(inst)}
            >
              <Image
                src={inst.iconUrl}
                alt={inst.name.replace("magi-", "")}
                width={36}
                height={36}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
const ActionFC = () => {
  const [inputActive, setInputActive] = useState(false);
  const [castState, setCastState] = useState({
    text: "",
    embeds: [],
    parent: null,
  });
  const [randomRange, setRandomRange] = useState({ min: 0, max: 999999 });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stateParam = params.get("state");

    if (stateParam) {
      try {
        const decodedState = JSON.parse(decodeURIComponent(stateParam));
        if (decodedState.cast) {
          setCastState(decodedState.cast);
        }
      } catch (error) {
        console.error("Error parsing state parameter:", error);
      }
    }

    // Set initial random range
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
            "image_text,cast_caption,image_type,image_character,image_object,image_content,image_color",
          sort_by: "random_sort_field:desc,_text_match:desc,casted_at:desc",
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
          const indexUiState = uiState["magi"];
          return { search: indexUiState?.query || "" };
        },
        routeToState(routeState) {
          return {
            magi: {
              query: routeState.search || "",
            },
          };
        },
      },
    }),
    []
  );

  const handleMemeSelect = (meme) => {
    console.log("Meme selected:", meme);
    console.log("Sending updated cast");

    try {
      const updatedCastState = {
        ...castState,
        embeds: [...castState.embeds, meme.image_url],
      };

      const postData = {
        type: "createCast",
        data: {
          cast: updatedCastState,
        },
      };

      window.parent.postMessage(postData, "*");

      console.log("PostMessage sent successfully");
    } catch (error) {
      console.error("Error sending postMessage:", error);
    }
  };

  return (
    <InstantSearch
      indexName="magi"
      searchClient={searchClient}
      routing={routing}
      future={{ preserveSharedStateOnUnmount: true }}
    >
      <Configure hitsPerPage={40} />
      <div className={styles.searchAndKeywordsContainer}>
        <div className={styles.searchBarContainer}>
          <div className={styles.logoLeft}>
            <Image
              src={"/magi-logo.png"}
              alt="Magi Logo"
              width={100}
              height={100}
              priority
              className={styles.spinHover}
            />
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
      <InfiniteHits onMemeSelect={handleMemeSelect} />
    </InstantSearch>
  );
};

export default ActionFC;
