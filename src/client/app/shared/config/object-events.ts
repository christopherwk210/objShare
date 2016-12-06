/** Represents the event strings of all possible events. */
export const events: any = {
  create: 'Create',
  destroy: 'Destroy',
  alarm: [
    'Alarm 0',
    'Alarm 1',
    'Alarm 2',
    'Alarm 3',
    'Alarm 4',
    'Alarm 5',
    'Alarm 6',
    'Alarm 7',
    'Alarm 8',
    'Alarm 9',
    'Alarm 10',
    'Alarm 11',
  ],
  step: {
    begin: 'Begin step',
    normal: 'Step',
    end: 'End step'
  },
  collision: 'Collision with ',
  keyboard: {
    pressed: 'Press: ',
    released: 'Release: ',
    keyboard: 'Keyboard: '
  },
  mouse: {
    left: {
      button: 'Left button',
      pressed: 'Left pressed',
      released: 'Left released'
    },
    middle: {
      button: 'Middle button',
      pressed: 'Middle pressed',
      released: 'Middle released'
    },
    right: {
      button: 'Right button',
      pressed: 'Right pressed',
      released: 'Right released'
    },
    wheel: {
      up: 'Mouse wheel up',
      down: 'Mouse wheel down'
    },
    global: {
      left: {
        button: 'Global left button',
        pressed: 'Global left pressed',
        released: 'Global left released'
      },
      middle: {
        button: 'Global middle button',
        pressed: 'Global middle pressed',
        released: 'Global middle released'
      },
      right: {
        button: 'Global right button',
        pressed: 'Global right pressed',
        released: 'Global right released'
      },
    },
    enter: 'Mouse enter',
    leave: 'Mouse leave',
    none: 'No button'
  },
  other: {
    outside: 'Outside room',
    intersect: 'Intersect boundary',
    start: 'Game start',
    game: {
      start: 'Game start',
      end: 'Game end'
    },
    room: {
      start: 'Room start',
      end: 'Room end'
    },
    lives: 'No more lives',
    health: 'No more health',
    animation: {
      end: 'Animation end',
      update: 'Animation update'
    },
    path: 'End of path',
    views: {
      outside: [
        'Outside view 0',
        'Outside view 1',
        'Outside view 2',
        'Outside view 3',
        'Outside view 4',
        'Outside view 5',
        'Outside view 6',
        'Outside view 7',
      ],
      boundary: [
        'Boundary view 0',
        'Boundary view 1',
        'Boundary view 2',
        'Boundary view 3',
        'Boundary view 4',
        'Boundary view 5',
        'Boundary view 6',
        'Boundary view 7',
      ]
    },
    user: [
      'User 0',
      'User 1',
      'User 2',
      'User 3',
      'User 4',
      'User 5',
      'User 6',
      'User 7',
      'User 8',
      'User 9',
      'User 10',
      'User 11',
      'User 12',
      'User 13',
      'User 14',
      'User 15',
    ]
  },
  draw: {
    draw: {
      draw: 'Draw',
      begin: 'Draw begin',
      end: 'Draw end'
    },
    gui: {
      draw: 'Draw GUI',
      begin: 'Draw GUI begin',
      end: 'Draw GUI end'
    },
    resize: 'Resize',
    pre: 'PreDraw',
    post: 'PostDraw'
  },
  asynchronous: {
    image: 'Image Loaded',
    http: 'HTTP',
    dialog: 'Dialog',
    iap: 'IAP',
    cloud: 'Cloud',
    networking: 'Networking',
    steam: 'Steam',
    social: 'Social',
    push: 'Push Notifications',
    save: 'Save / Load',
    recording: 'Audio Recording',
    playback: 'Audio Playback',
    system: 'System Event'
  }
};

/** Represents the order of events as they appear in the event list */
export const eventOrder: any = {
  create: 0,
  destroy: 1,
  alarm: 2,
  step: 3,
  collision: 4,
  keyboard: 5,
  mouse: 6,
  other: 7,
  draw: 8,
  async: 9
};

/** Represents the XML eventtype attribute value for each event */
export const eventTypes: any = {
  create: 0,
  destroy: 1,
  alarm: 2,
  step: 3,
  collision: 4,
  keyboard: 5,
  mouse: 6,
  other: 7,
  draw: 8,
  keypress: 9,
  keyrelease: 10,
  async: 7
};

/** Represents the XML enumb attribute value for each sub-event */
export const eventEnumbs: Object = {
  create: 0,
  destroy: 0,
  alarm: [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11
  ],
  step: {
    begin: 1,
    normal: 0,
    end: 2
  },
  mouse: {
    left: {
      button: 0,
      pressed: 4,
      released: 7
    },
    middle: {
      button: 2,
      pressed: 6,
      released: 9
    },
    right: {
      button: 1,
      pressed: 5,
      released: 8
    },
    none: 3,
    enter: 10,
    leave: 11,
    wheel: {
      up: 12,
      down: 13
    },
    global: {
      left: {
        button: 50,
        pressed: 53,
        released: 56
      },
      middle: {
        button: 52,
        pressed: 55,
        released: 58
      },
      right: {
        button: 51,
        pressed: 54,
        released: 57
      },
    }
  },
  other: {
    outside: 0,
    intersect: 1,
    game: {
      start: 2,
      end: 3
    },
    room: {
      start: 4,
      end: 5
    },
    lives: 6,
    health: 9,
    animation: {
      end: 7,
      update: 58
    },
    path: 8,
    views: {
      outside: [
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
      ],
      boundary: [
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57
      ]
    },
    user: [
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25
    ]
  },
  draw: {
    draw: {
      draw: 0,
      begin: 72,
      end: 73
    },
    gui: {
      draw: 64,
      begin: 74,
      end: 75
    },
    resize: 65,
    pre: 76,
    post: 77
  },
  async: {
    image: 60,
    http: 62,
    dialog: 63,
    iap: 66,
    cloud: 67,
    networking: 68,
    steam: 69,
    social: 70,
    push: 71,
    save: 72,
    recording: 73,
    playback: 74,
    system: 75
  }
};

/** An object with the correct strings for async events based on enumbs */
export const asyncEnumbs:any = {
  '60': events.asynchronous.image,
  '62': events.asynchronous.http,
  '63': events.asynchronous.dialog,
  '66': events.asynchronous.iap,
  '67': events.asynchronous.cloud,
  '68': events.asynchronous.networking,
  '69': events.asynchronous.steam,
  '70': events.asynchronous.social,
  '71': events.asynchronous.push,
  '72': events.asynchronous.save,
  '73': events.asynchronous.recording,
  '74': events.asynchronous.playback,
  '75': events.asynchronous.system
};

/** An object with the correct strings for draw events based on enumbs */
export const drawEnumbs:any = {
  '0': events.draw.draw.draw,
  '64': events.draw.gui.draw,
  '65': events.draw.resize,
  '72': events.draw.draw.begin,
  '73': events.draw.draw.end,
  '74': events.draw.gui.begin,
  '75': events.draw.gui.end,
  '76': events.draw.pre,
  '77': events.draw.post
};

/** An object with the correct strings for other events based on enumbs */
export const otherEnumbs:any = {
  '0': events.other.outside,
  '1': events.other.intersect,
  '2': events.other.game.start,
  '3': events.other.game.end,
  '4': events.other.room.start,
  '5': events.other.room.end,
  '6': events.other.lives,
  '7': events.other.animation.end,
  '8': events.other.path,
  '9': events.other.health,
  '10': events.other.user[0],
  '11': events.other.user[1],
  '12': events.other.user[2],
  '13': events.other.user[3],
  '14': events.other.user[4],
  '15': events.other.user[5],
  '16': events.other.user[6],
  '17': events.other.user[7],
  '18': events.other.user[8],
  '19': events.other.user[9],
  '20': events.other.user[10],
  '21': events.other.user[11],
  '22': events.other.user[12],
  '23': events.other.user[13],
  '24': events.other.user[14],
  '25': events.other.user[15],
  '40': events.other.views.outside[0],
  '41': events.other.views.outside[1],
  '42': events.other.views.outside[2],
  '43': events.other.views.outside[3],
  '44': events.other.views.outside[4],
  '45': events.other.views.outside[5],
  '46': events.other.views.outside[6],
  '47': events.other.views.outside[7],
  '50': events.other.views.boundary[0],
  '51': events.other.views.boundary[1],
  '52': events.other.views.boundary[2],
  '53': events.other.views.boundary[3],
  '54': events.other.views.boundary[4],
  '55': events.other.views.boundary[5],
  '56': events.other.views.boundary[6],
  '57': events.other.views.boundary[7],
  '58': events.other.animation.update
};

/** An object with the correct strings for mouse events based on enumbs */
export const mouseEnumbs:any = {
  '0': events.mouse.left.button,
  '1': events.mouse.right.button,
  '2': events.mouse.middle.button,
  '3': events.mouse.none,
  '4': events.mouse.left.pressed,
  '5': events.mouse.right.pressed,
  '6': events.mouse.middle.pressed,
  '7': events.mouse.left.released,
  '8': events.mouse.right.released,
  '9': events.mouse.middle.released,
  '10': events.mouse.enter,
  '11': events.mouse.leave,
  '12': events.mouse.wheel.up,
  '13': events.mouse.wheel.down,
  '50': events.mouse.global.left.button,
  '51': events.mouse.global.right.button,
  '52': events.mouse.global.middle.button,
  '53': events.mouse.global.left.pressed,
  '54': events.mouse.global.right.pressed,
  '55': events.mouse.global.middle.pressed,
  '56': events.mouse.global.left.released,
  '57': events.mouse.global.right.released,
  '58': events.mouse.global.middle.released
};

/** Object containing all keystrings as values and keycodes as keys */
export const keyCodeList:any = {
  '0': '< No key >',
  '1': '< Any key >',
  '8': '< Backspace >',
  '13': '< Enter >',
  '16': '< Shift >',
  '17': '< Ctrl >',
  '18': '< Alt >',
  '27': '< Escape >',
  '32': '< Space >',
  '33': '< Page up >',
  '34': '< Page down >',
  '35': '< End >',
  '36': '< Home >',
  '37': '< Left >',
  '38': '< Up >',
  '39': '< Right >',
  '40': '< Down >',
  '45': '< Insert >',
  '46': '< Delete >',
  '48': '0',
  '49': '1',
  '50': '2',
  '51': '3',
  '52': '4',
  '53': '5',
  '54': '6',
  '55': '7',
  '56': '8',
  '57': '9',
  '65': 'A',
  '66': 'B',
  '67': 'C',
  '68': 'D',
  '69': 'E',
  '70': 'F',
  '71': 'G',
  '72': 'H',
  '73': 'I',
  '74': 'J',
  '75': 'K',
  '76': 'L',
  '77': 'M',
  '78': 'N',
  '79': 'O',
  '80': 'P',
  '81': 'Q',
  '82': 'R',
  '83': 'S',
  '84': 'T',
  '85': 'U',
  '86': 'V',
  '87': 'W',
  '88': 'X',
  '89': 'Y',
  '90': 'Z',
  '96': 'Keypad 0',
  '97': 'Keypad 1',
  '98': 'Keypad 2',
  '99': 'Keypad 3',
  '100': 'Keypad 4',
  '101': 'Keypad 5',
  '102': 'Keypad 6',
  '103': 'Keypad 7',
  '104': 'Keypad 8',
  '105': 'Keypad 9',
  '111': 'Keypad /',
  '106': 'Keypad *',
  '109': 'Keypad -',
  '107': 'Keypad +',
  '110': 'Keypad .',
  '112': 'F1',
  '113': 'F2',
  '114': 'F3',
  '115': 'F4',
  '116': 'F5',
  '117': 'F6',
  '118': 'F7',
  '119': 'F8',
  '120': 'F9',
  '121': 'F10',
  '122': 'F11',
  '123': 'F12',
};
