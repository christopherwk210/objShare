/** Represents the event strings of all possible events. */
export const events: Object = {
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
export const eventOrder: Object = {
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
export const eventTypes: Object = {
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
