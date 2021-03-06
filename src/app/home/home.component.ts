import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ipcRenderer } from "electron";
import { Howl } from "howler";
import * as $ from "jquery";
import * as db from "node-localdb-modern";
const Cryptr = require("cryptr");
require("dotenv").config();

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  fullScreen = true;
  savedGames = [];
  listOfSavedGames = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.playBGMusic();
    this.ifSaveGamesPresent();
  }

  playBGMusic() {
    const bgAudio = document.getElementById("bgAudio") as HTMLAudioElement;
    bgAudio.loop = true;
  }
  toggleScreenMode() {
    if (this.fullScreen) {
      this.fullScreen = false;
      this.windowsMode();
    } else {
      this.fullScreen = true;
      this.fullScreenMode();
    }
  }
  windowsMode() {
    const fit_full_screnn = document.getElementById(
      "window_full_screen_mode"
    ) as HTMLButtonElement;
    fit_full_screnn.innerHTML = `<span class="ion ion-ios-expand"></span>`;
    ipcRenderer.send("windowMode");
  }
  fullScreenMode() {
    const fit_full_screnn = document.getElementById(
      "window_full_screen_mode"
    ) as HTMLButtonElement;
    fit_full_screnn.innerHTML = `<span class="ion ion-ios-contract"></span>`;
    ipcRenderer.send("fullScreenMode");
  }
  toggleBGMAudio() {
    const bgAudio = document.getElementById("bgAudio") as HTMLAudioElement;
    return bgAudio.paused ? this.playAudio() : this.pauseAudio();
  }

  pauseAudio() {
    const bgAudio = document.getElementById("bgAudio") as HTMLAudioElement;
    const play_pause_button = document.getElementById(
      "play_pause_button"
    ) as HTMLButtonElement;
    bgAudio.pause();
    play_pause_button.innerHTML = `<span class="ion ion-ios-volume-off"></span>`;
  }

  playAudio() {
    const bgAudio = document.getElementById("bgAudio") as HTMLAudioElement;
    const play_pause_button = document.getElementById(
      "play_pause_button"
    ) as HTMLButtonElement;
    bgAudio.play();
    play_pause_button.innerHTML = `<span class="ion ion-ios-volume-high"></span>`;
  }

  creditsDisplay() {
    const audio = new Howl({
      src: ["./assets/media/BGM/pull-back.mp3"],
    });
    // const audio = new Audio('../../assets/media/BGM/pull-back.mp3');
    audio.play();
    this.router.navigate(["credits"]);
  }

  quitApp() {
    const audio = new Audio("./assets/media/BGM/pull-back.mp3");
    audio.play();
    ipcRenderer.send("quitGame");
  }

  ifSaveGamesPresent() {
    const savegameDB = db("./savegames.db");
    savegameDB.count({}).then((count) => {
      if (count === 0) {
        $("#loadSavedGames").hide();
      }
    });
  }

  newGame() {
    const audio = new Audio("./assets/media/BGM/pull-back.mp3");
    audio.play();
    $("#nav_buttons").addClass("slideOut");
    $("#title_container").addClass("toTheRight");
    $("#cancelNewGame").addClass("slideInFromLeft");
    $("#newGameCreator").addClass("slideInFromRight");
  }

  cancelNewGame() {
    const audio = new Audio("./assets/media/BGM/pull-back.mp3");
    audio.play();
    $("#nav_buttons").removeClass("slideOut");
    $("#title_container").removeClass("toTheRight");
    $("#cancelNewGame").removeClass("slideInFromLeft");
    $("#newGameCreator").removeClass("slideInFromRight");
  }

  closeAlert() {
    const audio = new Audio("./assets/media/BGM/pull-back.mp3");
    audio.play();
    $("#alertBox").hide();
  }

  loadSavedGames() {
    const audio = new Audio("./assets/media/BGM/pull-back.mp3");
    audio.play();
    $("#nav_buttons").addClass("slideOut");
    $("#title_container").addClass("toTheRight");
    $("#cancelLoadGame").addClass("slideInFromLeft");
    $("#saveGameLoader").addClass("slideInFromRight");
    this.loadSaveGamesDB();
  }

  loadSaveGamesDB() {
    const savegameDB = db("./savegames.db");
    savegameDB.find({}, { limit: 5 }).then((data) => {
      $("#savedGamesBlock").empty();
      data.forEach((element) => {
        const encryptedData = element.encryptedData;
        const secret = process.env.ENCRYPTION_KEY;
        const cryptr = new Cryptr(secret);
        const decryptedData = JSON.parse(cryptr.decrypt(encryptedData));
        // console.log(decryptedData);
        $("#savedGamesBlock").append(`
        <div id='${decryptedData.username}' class="saveGame">
         <div class="left">
            <h3>${decryptedData.gameIat}</h3>
            <h4>${decryptedData.username} (Level ${decryptedData.level})</h4>
          </div>
          <div class="right">
           <button class="loadGameButton" data-text="Load Game">Load Game</button>
           <button class="deleteGameButton" data-text="Delete Game">
             Delete Game
           </button>
          </div>
       </div>`);
      });
    });
  }

  cancelLoadGame() {
    const audio = new Audio("./assets/media/BGM/pull-back.mp3");
    audio.play();
    $("#nav_buttons").removeClass("slideOut");
    $("#title_container").removeClass("toTheRight");
    $("#cancelLoadGame").removeClass("slideInFromLeft");
    $("#saveGameLoader").removeClass("slideInFromRight");
    this.ifSaveGamesPresent();
  }

  startNewGame() {
    const username = $("#username").val();
    const password = $("#password").val();
    if (username === "" && password === "") {
      $("#messageAlert").text(
        "Please enter username and password to start a new game."
      );
      const audio = new Audio("./assets/media/BGM/nasty-error-long.mp3");
      audio.play();
      $("#alertBox").show();
    } else if (username === "" && password !== "") {
      $("#messageAlert").text("Please enter username to start a new game.");
      const audio = new Audio("./assets/media/BGM/nasty-error-long.mp3");
      audio.play();
      $("#alertBox").show();
    } else if (username !== "" && password === "") {
      $("#messageAlert").text("Please enter password to start a new game.");
      const audio = new Audio("./assets/media/BGM/nasty-error-long.mp3");
      audio.play();
      $("#alertBox").show();
    } else {
      const savegameDB = db("./savegames.db");
      savegameDB.findOne({ username: username }).then((data) => {
        if (data) {
          $("#messageAlert").text(
            `User with username: ${username} already exists. Please choose a different username.`
          );
          const audio = new Audio("./assets/media/BGM/nasty-error-long.mp3");
          audio.play();
          $("#alertBox").show();
        } else {
          const secret = process.env.ENCRYPTION_KEY;
          const cryptr = new Cryptr(secret);
          const currentdate = new Date();
          const datetime =
            currentdate.getDate() +
            "/" +
            (currentdate.getMonth() + 1) +
            "/" +
            currentdate.getFullYear() +
            " @ " +
            currentdate.getHours() +
            ":" +
            currentdate.getMinutes() +
            ":" +
            currentdate.getSeconds();
          savegameDB.count({}).then((count) => {
            if (count < 5) {
              const audio = new Audio("./assets/media/BGM/pull-back.mp3");
              audio.play();
              const saveGameData = {
                username,
                password,
                level: 1,
                money: 500,
                skillslevel: 0,
                software: [],
                courseTaken: [],
                courseAvailable: [],
                knownWifiNetworks: [],
                wifiNetworksAvailable: [],
                purchasedItems: {
                  CPU: [0],
                  RAM: [0],
                  WifiCard: [0],
                  Bluetooth: [],
                  Storage: [0],
                },
                installedItems: {
                  CPU: [0],
                  RAM: [0],
                  WifiCard: [0],
                  Bluetooth: [],
                  Storage: [0],
                },
                availableForPurchase: {
                  CPU: [],
                  RAM: [],
                  WifiCard: [],
                  Bluetooth: [],
                  Storage: [],
                },
                files: [],
                gameIat: datetime,
              };
              const encryptedData = cryptr.encrypt(
                JSON.stringify(saveGameData)
              );
              // const decryptedString = cryptr.decrypt(encryptedData);
              savegameDB.insert({ username, encryptedData }).then((data) => {
                console.log(data);
              });
            } else {
              $("#messageAlert").text(
                `This game can store upto 5 save games. You already have 5 save games. Please delete a save game before creating a new game.`
              );
              const audio = new Audio(
                "./assets/media/BGM/nasty-error-long.mp3"
              );
              audio.play();
              $("#alertBox").show();
            }
          });
        }
      });
    }
  }
}
