import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Loader from "../Loading/Loader";
import "./MarkDownReaderComponent.css";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  a11yDark,
  a11yLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  InstapaperShareButton,
  InstapaperIcon,
  TwitterIcon,
  TwitterShareButton,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const MarkDownReaderComponent = ({
  link,
  like,
  heart,
  title,
  shortTitle,
  blogLink,
}) => {
  const [mdText, setMdText] = useState("");
  const [pageLocation, setPageLoation] = useState(0);
  // The back-to-top button is hidden at the beginning
  const [showButton, setShowButton] = useState(false);

  const CopyCodeToClipboard = () => {
    const copyButtonLabel = "Copy Code";

    // you can use a class selector instead if you, or the syntax highlighting library adds one to the 'pre'.
    let blocks = document.querySelectorAll("pre");

    blocks.forEach((block) => {
      // only add button if browser supports Clipboard API
      if (navigator.clipboard) {
        let button = document.createElement("button");
        button.innerText = copyButtonLabel;
        button.className = "CopyToClipboardButton";

        button.addEventListener("click", copyCode);
        block.appendChild(button);
      }
    });

    async function copyCode(event) {
      const button = event.srcElement;
      const pre = button.parentElement;
      let code = pre.querySelector("code");
      let text = code.innerText;
      await navigator.clipboard.writeText(text);

      button.innerText = "Code Copied";
      setTimeout(() => {
        button.innerText = copyButtonLabel;
      }, 1000);
    }
  };
  useEffect(() => {
    fetch(link)
      .then((response) => {
        if (response.ok) return response.text();
        else return Promise.reject("Didn't fetch text correctly");
      })
      .then((text) => {
        setMdText(text);
        // console.log(mdText);
        CopyCodeToClipboard();
      })
      .catch((error) => console.error(error));
  }, [link]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  return (
    <>
      {mdText == "" ? (
        <div style={{ marginTop: "90px" }}>
          <Loader />
        </div>
      ) : (
        <>
          <h1
            style={{
              textAlign: "center",
              fontSize: "40px",
              padding: "15px",
              lineHeight: "46px",
              margin: "10px 0px 0px 0px",
            }}
          >
            {title}
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FacebookShareButton
              url={"https://www.capscode.in" + blogLink}
              quote={shortTitle}
              hashtag="#webdevelopment"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <LinkedinShareButton
              url={"https://www.capscode.in" + blogLink}
              title={title}
              summary={shortTitle}
              source="https://www.capscode.in"
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <TwitterShareButton
              url={"https://www.capscode.in" + blogLink}
              title={shortTitle}
              hashtags={[
                "capscode",
                "javascript",
                "reactjs",
                "coding",
                "frontend",
                "webdevelopment",
                "htmlcss",
              ]}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            {/* <FacebookMessengerShareButton
              url={"https://www.capscode.in" + blogLink}
              quote={shortTitle}
            >
              <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton> */}
            <TelegramShareButton
              url={"https://www.capscode.in" + blogLink}
              title={shortTitle}
            >
              <TelegramIcon size={32} round />
            </TelegramShareButton>

            <WhatsappShareButton
              url={"https://www.capscode.in" + blogLink}
              title={shortTitle}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
          <ReactMarkdown
            children={mdText}
            className="markdown-body"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    style={a11yDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code
                    className={className}
                    {...props}
                    style={{
                      background: "#d3d3d396",
                      padding: "2px",
                      borderRadius: "2px",
                    }}
                  >
                    {children}
                  </code>
                );
              },
            }}
          />

          {showButton && (
            <button
              style={{
                position: "sticky",
                bottom: 10,
                float: "right",
                margin: "12px",
                borderRadius: "0.3em",
                height: "40px",
                width: "40px",
                fontSize: "2rem",
                color: "darkgrey",
                background: "rgba( 255, 255, 255, 0.2 )",
                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                backdropFilter: "blur( 2px )",
                borderRadius: "10px",
                border: "1px solid rgba( 255, 255, 255, 0.18 )",
              }}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth", // for smoothly scrolling
                });
              }}
            >
              &#8679;
            </button>
          )}
        </>
      )}

      {/* <div
        style={{
          height: "130px",
          background: "red",
          width: "50px",
          position: "fixed",
          top: 150,
          right: 0,
        }}
      >
        <button>Like</button>
        <span>{like}</span>
        <button>Love</button>
      </div> */}
    </>
  );
};

export default MarkDownReaderComponent;
