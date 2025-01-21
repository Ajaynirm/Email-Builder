import React, { useEffect, useRef, useState } from "react";
import { useDataStore } from "../../store/useDataStore";
import DOMPurify from "dompurify";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
const Preview = () => {
  const { htmlLayout, title, content, img, postObject, loading } = useDataStore();
  const [html, setHtml] = useState("");
  const htmlRef = useRef(null);

  useEffect(() => {
    if (htmlLayout) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlLayout, "text/html");

      const updateHtmlContent = (id, value) => {
        const element = doc.getElementById(id);
        if (element) element.innerHTML = value;
      };

      updateHtmlContent("title", title);

      updateHtmlContent("content", content);

      const imageElement = doc.querySelector("img");
      if (imageElement) {
        imageElement.src = img;
      }

      setHtml(doc.body.innerHTML);
    }
  }, [title, content, img, htmlLayout]);

  const handleDownload = () => {
    if (htmlRef.current) {
      const innerHtml = htmlRef.current.innerHTML;
      const blob = new Blob([innerHtml], { type: "text/html" });

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "downloaded_Email-Template.html";
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    toast.success("Template downloaded Successfully");
  };

  const postHtmlObject = (e) => {
    e.preventDefault();
    toast.promise(postObject(), {
      loading: "Object sending to Backend...",
      success: "Object Stored in Database successfully!",
      error: "Object sent failed. Please try again.",
    });
  };

  if (loading) {
    return (
      <>
        <div className="flex flex-col justify-center items-center p-10">
          <div>Object sent to Backend</div>
          <Loading />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex flex-col  flex-wrap justify-center items-center p-2  border-2 border-black-700 ">
        <h2 className="animate-pulse p-2 font-serif">Preview</h2>
        {htmlLayout ? (
          <div>
            <div
              className=" border-4 border-black-800 min-h-24"
              ref={htmlRef}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
              contentEditable
            />
            <div className="flex justify-around p-2 pt-10">
              <button
                onClick={handleDownload}
                className="btn btn-neutral"
              >
                Download
              </button>
              <button
                onClick={postHtmlObject}
                className="btn btn-neutral"
              >
                Post current values
              </button>
              
            </div>
            <div className='pt-10  font-serif animate-bounce'> <span className="font-serif font-extrabold">Note :</span> preview Template only responsible for larger screen - Due to <span className="font-mono font-bold">Gmail </span>compatibility</div>
          </div>
        ) : (
          <div>
            <Loading />
            <div>
              Backend is slow - getting HTML template from backend. Wait
              and Refresh
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Preview;
