import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "./Speech.css";
import { FaPlay, FaStop } from "react-icons/fa";
import { MdClose, MdContentCopy } from "react-icons/md";

const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRec();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

export default function ConvertText() {
  const [note, setNote] = useState(`Type with your voice.`);
  const [noteStyle, setNoteStyle] = useState(true);
  const [isListening, setisListening] = useState(false);
  const [savedNotes, setisSavedNotes] = useState([]);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("mic end");
      };
    }

    mic.onstart = () => {
      console.log("mic on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log("transcript", transcript);
      setNote(transcript);

      mic.onerror = (event) => {
        console.log("error", event.error);
      };
    };
  };

  const handleSaveNote = () => {
    setisSavedNotes([...savedNotes, note]);
    setNote("");
  };
  return (
    <div>
      <div className="card">
        <div className="cardHeader">
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Italic"
            style={{
              float: "left",
            }}
            defaultChecked
            onClick={() => setNoteStyle((prev) => !prev)}
          />
          <MdClose
            color="rgb(153, 153, 153)"
            size={40}
            style={{
              float: "right",
            }}
            onClick={() => {
              setNote("");
            }}
            title="Clear All"
          />
          <Button
            variant="outline-secondary"
            disabled={!note}
            onClick={handleSaveNote}
            style={{ float: "right" }}
          >
            {" "}
            Save Notes
          </Button>
          <MdContentCopy
            size={38}
            color="rgb(153, 153, 153)"
            style={{ float: "right" }}
            onClick={() => {
              navigator.clipboard.writeText(note);
            }}
            title="Copy"
          />
          {isListening ? (
            <FaStop
              size={30}
              onClick={() => setisListening((prev) => !prev)}
              title="Stop"
            />
          ) : (
            <FaPlay
              size={30}
              onClick={() => setisListening((prev) => !prev)}
              title="Start"
            />
          )}
        </div>
        <textarea
          value={note}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            fontStyle: noteStyle ? "italic" : "normal",
          }}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      {savedNotes.length > 0 ? (
        <div>
          <h4 style={{ marginTop: "5%" }}>
            <i>Saved Notes</i>
          </h4>
          {savedNotes.map((item, index) => (
            <div key={index} className="savedCards">
              {item}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
