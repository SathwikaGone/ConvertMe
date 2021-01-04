import React, { useState } from "react";
import "./Speech.css";
import { Form, DropdownButton, ButtonGroup, Dropdown } from "react-bootstrap";
import { ImPaste, ImStop, ImPlay2 } from "react-icons/im";
import {
  MdClose,
  MdPlayCircleFilled,
  MdPauseCircleOutline,
} from "react-icons/md";
import VOICEDATA from "./voiceData.json";
var synth = window.speechSynthesis;

var voices = [];
voices = synth.getVoices();
let voicesData = VOICEDATA.data;

export default function ConvesrterSpeach() {
  const [
    text,
    settext,
  ] = useState(`  Drag and drop your files, or type, paste, and edit text here.
  
  ConvertMe is a text to speech program that converts any written text into spoken words. They can hear it in different voices by selecting one.`);

  const [playToogle, setplayToogle] = useState(true);
  const [textStyle, settextStyle] = useState(true);
  const [playVoice, setplayVoice] = useState(
    "Microsoft David Desktop - English (United States)"
  );

  let handleSpeech = () => {
    setplayToogle(false);
    var toSpeak = new SpeechSynthesisUtterance(text);
    var selectedVoiceName =
      playVoice || " Microsoft David Desktop - English (United States)";

    voices.forEach((voice) => {
      if (voice.name === selectedVoiceName) {
        toSpeak.voice = voice;
      }
    });
    synth.speak(toSpeak);

    toSpeak.onend = () => {
      setplayToogle(true);
    };
  };

  return (
    <div className="card">
      <div>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Italic"
          style={{
            float: "left",
          }}
          defaultChecked
          onClick={() => settextStyle((prev) => !prev)}
        />
        {playToogle ? (
          <MdPlayCircleFilled size={40} onClick={handleSpeech} title="Play" />
        ) : (
          <React.Fragment>
            <ImPlay2
              size={30}
              onClick={() => {
                synth.resume();
              }}
              title="Resume"
            />
            {"  "}

            <MdPauseCircleOutline
              size={36}
              onClick={() => {
                synth.pause();
              }}
              title="Pause"
            />
            {"  "}
            <ImStop
              size={30}
              onClick={() => {
                setplayToogle(true);
                synth.cancel();
              }}
              title="Stop"
            />
          </React.Fragment>
        )}

        <MdClose
          color="rgb(153, 153, 153)"
          size={30}
          style={{
            float: "right",
            order: 2,
          }}
          onClick={() => {
            settext("");
          }}
          title="Clear All"
        />
        <ImPaste
          color="rgb(153, 153, 153)"
          size={30}
          style={{
            float: "right",
            order: 1,
          }}
          onClick={() => {
            navigator.clipboard.readText().then((val) => settext(val));
          }}
          title="Paste"
        />

        <DropdownButton
          as={ButtonGroup}
          style={{
            float: "right",
          }}
          id={`dropdown-variants-Info`}
          variant="Info"
          title="Select Voice"
        >
          {voicesData.map((voice, index) => (
            <Dropdown.Item
              key={index}
              eventKey={voice.name}
              onSelect={(voice) => {
                setplayVoice(voice);
              }}
            >
              {voice.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      <textarea
        value={text}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          fontStyle: textStyle ? "italic" : "normal",
        }}
        onChange={(e) => settext(e.target.value)}
      />
    </div>
  );
}
