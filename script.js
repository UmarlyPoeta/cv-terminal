const output = document.getElementById('output');
const input = document.getElementById('commandInput');

const commands = {
  help: `Available commands:
- about
- projects
- education
- skills
- hobbies
- contact
- cls`,

  about: `My name is Patryk Kozłowski. I'm 21 years old and currently pursuing a Bachelor's degree in Technical Computer Science at AGH University of Science and Technology in Kraków.

I'm actively seeking an internship as a software engineer. At the moment, I'm enrolled in the Amazon Java Developer program, which I can access for free thanks to a partnership between my university and Coursera.

Recently, I’ve developed a strong interest in electronics. In my free time, I’m designing my own custom CPU architecture inspired by the Z80 processor. Besides that, I enjoy learning practical crafts like sewing, woodworking, and general DIY home projects.

I'm also an active member of the AGH Solar Boat scientific club, specifically in the High Software section. My work there has included developing a finite state machine for an autonomous boat, building navigation utilities, and researching obstacle avoidance algorithms. Currently, I’m focused on implementing modular decision trees in C++ using ROS2 and the NAV2 stack.

As a side project, I also design custom 3D models in SolidWorks.`,

  education: `Bachelor of Science in Computer Science in Engineering
AGH University of Science and Technology, Kraków
2024 - Present`,

  skills: `Programming Languages:
- Java, C++, Python, C, Pandas, NumPy, Matplotlib
- HTML, CSS
- Bash, SQL

Technologies & Tools:
- React, Git, ROS2
- Docker, Linux, Windows
- Agile methodologies,
- Finite State Machines, Decision Trees
- Navigation algorithms, Obstacle avoidance
- Basic electronics, PCB design
- Arduino, Raspberry Pi
- SolidWorks, 3D modeling
- PostgreSQL, MySQL

Basic knowledge of:
- machine learning
- computer architecture
- operating systems
- computer networks
- web development
- data structures and algorithms
- software engineering principles`,

  hobbies: `- Building electronics and DIY projects
- Sewing and woodworking
- Creating custom CPU designs
- Retro games and terminal interfaces
- Exploring new technologies and programming languages
- Arduino and Raspberry Pi projects
- ESP32 development
- Soldering and PCB design`,

  contact: `You can reach me at:
email: pkozlowski@student.agh.edu.pl
GitHub: https://github.com/UmarlyPoeta
LinkedIn: www.linkedin.com/in/patrykkozlowskisoftawedeveloper`,

  projects: async function () {
    const projects = [
      {
        title: 'My-Grep',
        desc: 'CLI grep clone written in Python',
        url: 'https://github.com/UmarlyPoeta/My-Grep',
        ascii: `
 _______________________
|  ~/grep file.txt      |
|  > Searching...       |
|  12: match found      |
|  27: match found      |
|_______________________|`
      },
      {
        title: 'Chat-Bot',
        desc: 'Voice assistant that learns new answers',
        url: 'https://github.com/UmarlyPoeta/Chat-Bot',
        ascii: `
   _______
  /       \\
 |  Hello! |
  \\_______/
     \\
   [🤖]   Listening...
   /|\\
   / \\`
      },
      {
        title: 'agh rpg game',
        desc: 'C++ RPG game set on the AGH campus (SFML).',
        url: 'https://github.com/UmarlyPoeta/agh_rpg_game',
        ascii: `
 ________
| @    @ |
|   ()   |  <-- AGH Student
|________|
  /||\\     Sword: ++
  /  \\     Campus XP`
      },
      {
        title: 'Perła bot UGV',
        desc: 'Navigation tools for AGH Solar Boat autonomous rover.',
        url: 'https://github.com/UmarlyPoeta/dual_tech_konkurs_kod',
        ascii: `
     _______
 ___/ [] [] \\___
|___   ⚙️   ___|
    \\_____/
     /   \\     <- UGV wheels
    /_____\ `
      },
      {
        title: 'Task Manager CLI',
        desc: 'Command-line tool for managing tasks.',
        url: 'https://github.com/UmarlyPoeta/Task-Manager-CLI',
        ascii: `
+---------------------+
| Task Manager [CLI]  |
+---------------------+
| [1] Wash dishes     |
| [2] Code project    |
| [3] Sleep 😴        |
+---------------------+`
      },
      {
        title: 'File Organizer',
        desc: 'Organizes files by extension in Python.',
        url: 'https://github.com/UmarlyPoeta/File-Organizer',
        ascii: `
 📁 /Downloads
 ├── song.mp3 → /Music
 ├── report.pdf → /Docs
 ├── pic.jpg → /Images
 └── script.py → /Code`
      },
      {
        title: 'HTTP Server in Python',
        desc: 'A simple HTTP server in Python.',
        url: 'https://github.com/UmarlyPoeta/HTTP-Server-in-Python',
        ascii: `
┌─────────────────────┐
│ http://localhost:8000
├─────────────────────┤
│ GET /index.html     │
│ 200 OK              │
└─────────────────────┘`
      },
      {
        title: 'Game of Life',
        desc: 'Cellular automaton simulation in Python.',
        url: 'https://github.com/UmarlyPoeta/game_of_life',
        ascii: `
Generation 42:
 . . O . .
 O O O . .
 . . . . O
 O O . . .
 . . O O .`
      }
    ];

    for (const project of projects) {
      await typeText(`[ ${project.title.padEnd(20)} ] - ${project.desc}`);
      await typeText(`  ${project.url}`);
      await typeText(project.ascii);
    }

    await typeText(`\nSee more at: https://github.com/UmarlyPoeta`);
  }
};

function typeText(text, delay = 15) {
  return new Promise((resolve) => {
    const isAscii = text.trim().includes('\n') || /^[\s\S]*[╔═─│┌┐└┘╚╝]+/.test(text); // prosty test
    const el = document.createElement(isAscii ? 'pre' : 'p');
    if (isAscii) {
      el.style.fontFamily = 'monospace';
      el.style.whiteSpace = 'pre';
      el.style.marginBottom = '1em';
    }
    output.appendChild(el);

    let i = 0;
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, delay);
      } else {
        resolve();
      }
    }
    type();
  });
}

async function handleCommand(e) {
  if (e.key === 'Enter') {
    const command = input.value.trim().toLowerCase();
    input.value = '';
    await typeText(`> ${command}`);

    if (command === 'cls') {
      output.innerHTML = '';
      return;
    }

    if (commands[command]) {
      if (typeof commands[command] === 'function') {
        await commands[command]();
      } else {
        const lines = commands[command].split('\n');
        for (let line of lines) {
          await typeText(line);
        }
      }
    } else {
      await typeText(`Command not found. Type 'help' for a list of commands.`);
    }

    output.scrollTop = output.scrollHeight;
  }
}

input.addEventListener('keydown', handleCommand);
