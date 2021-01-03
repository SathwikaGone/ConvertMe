import React, { useState } from "react";
import "./Speech.css";
import { Form } from "react-bootstrap";
import { ImPaste, ImStop, ImPlay2 } from "react-icons/im";
import {
  MdClose,
  MdPlayCircleFilled,
  MdPauseCircleOutline,
} from "react-icons/md";

export default function ConverterSpeach() {
  const [
    text,
    settext,
  ] = useState(`  Drag and drop your files, or type, paste, and edit text here.
  
  Voice-Convert is a professional text to speech program that converts any written text into spoken words. The paid versions of Voice-Convert have many more features.
  
  If you are interested in using our voices for non-personal use such as for Youtube videos, e-Learning, or other commercial or public purposes, please check out our Voice-Convert Commercial web application.`);

  const [playToogle, setplayToogle] = useState(true);
  const [textStyle, settextStyle] = useState(true);

  var synth = window.speechSynthesis;

  let handleSpeech = () => {
    setplayToogle(false);

    var voices = [];

    voices = synth.getVoices();
    // var selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
    // voiceList.innerHTML = '';
    // voices.forEach((voice)=>{
    //     var listItem = document.createElement('option');
    //     listItem.textContent = voice.name;
    //     listItem.setAttribute('data-lang', voice.lang);
    //     listItem.setAttribute('data-name', voice.name);
    //     voiceList.appendChild(listItem);
    // });

    // voiceList.selectedIndex = selectedIndex;

    var toSpeak = new SpeechSynthesisUtterance(text);
    var selectedVoiceName =
      " Microsoft David Desktop - English (United States)"; // voiceList.selectedOptions[0].getAttribute('data-name');
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
