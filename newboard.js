let newBoard = [
    { key: 1,  boardNumber: 37, name: 'End' }, 
    { key: 2,  name: '', invisible: true }, 
    { key: 3,  name: '', invisible: true }, 
    { key: 4,  name: 'Roll' },
    { key: 5,  name: '', invisible: true }, 
    { key: 6,  name: '', invisible: true }, 
    { key: 7,  boardNumber: 1, name: 'Start' },
    { key: 8,  boardNumber: 36, name: '' }, 
    { key: 9,  name: '', invisible: true }, 
    { key: 10, name: '', invisible: true }, 
    { key: 11, name: 0 },
    { key: 12, name: '', invisible: true }, 
    { key: 13, name: '', invisible: true }, 
    { key: 14, boardNumber: 2, name: '' },
    { key: 15, boardNumber: 35, name: '' }, 
    { key: 16, name: '', invisible: true }, 
    { key: 17, name: '', invisible: true }, 
    { key: 18, name: '', invisible: true },
    { key: 19, name: '', invisible: true }, 
    { key: 20, name: '', invisible: true }, 
    { key: 21, boardNumber: 3, name: '' },
    { key: 22, boardNumber: 34, name: '' }, 
    { key: 23, boardNumber: 7, name: '', invisible: true, addItem: 'D3' }, 
    { key: 24, boardNumber: 6, name: '', invisible: true, addItem: 'D3' }, 
    { key: 25, boardNumber: 5, name: '', invisible: true, addItem: 'D3' },
    { key: 26, name: '', invisible: true }, 
    { key: 27, name: '', invisible: true }, 
    { key: 28, boardNumber: 4, name: '' },
    { key: 29, boardNumber: 33, name: '', DeleteItem: 'D3', extraScore: 1 }, 
    { key: 30, name: '', invisible: true }, 
    { key: 31, name: '', invisible: true }, 
    { key: 32, boardNumber: 4, name: '', invisible: true, addItem: 'D3' },
    { key: 33, name: '', invisible: true }, 
    { key: 34, name: '', invisible: true }, 
    { key: 35, boardNumber: 5, name: '', extraScore: 1 },
    { key: 36, boardNumber: 32, name: '', itemsToAdd: 'D3' }, 
    { key: 37, boardNumber: 1, name: '', invisible: true, extraScore: 1, addItem: 'D3'  }, 
    { key: 38, boardNumber: 2, name: '', invisible: true, addItem: 'D3' }, 
    { key: 39, boardNumber: 3, name: '', invisible: true, addItem: 'D3' },
    { key: 40, name: '', invisible: true }, 
    { key: 41, name: '', invisible: true }, 
    { key: 42, boardNumber: 6, name: '' },
    { key: 43, boardNumber: 31, name: '' }, 
    { key: 44, name: '', invisible: true }, 
    { key: 45, name: '', invisible: true }, 
    { key: 46, name: '', invisible: true },
    { key: 47, name: '', invisible: true }, 
    { key: 48, name: '', invisible: true }, 
    { key: 49, boardNumber: 7, name: '' },
    { key: 50, boardNumber: 30, name: '' }, 
    { key: 51, name: '', invisible: true }, 
    { key: 52, name: '', invisible: true }, 
    { key: 53, boardNumber: 3, name: '', invisible: true, AddItem: 'D1' },
    { key: 54, boardNumber: 2, name: '', invisible: true, AddItem: 'D1' }, 
    { key: 55, boardNumber: 1, name: '', invisible: true, AddItem: 'D1' }, 
    { key: 56, boardNumber: 8, name: '', itemsToAdd: 'D1' },
    { key: 57, boardNumber: 29, name: '' }, 
    { key: 58, name: '', invisible: true }, 
    { key: 59, name: '', invisible: true }, 
    { key: 60, boardNumber: 4, name: '', invisible: true, AddItem: 'D1' },
    { key: 61, name: '', invisible: true }, 
    { key: 62, name: '', invisible: true }, 
    { key: 63, boardNumber: 9, name: '', DeleteItem: 'D1' },
    { key: 64, boardNumber: 28, name: '' }, 
    { key: 65, name: '', invisible: true }, 
    { key: 66, name: '', invisible: true }, 
    { key: 67, boardNumber: 5, name: '', invisible: true, AddItem: 'D1' },
    { key: 68, boardNumber: 6, name: '', invisible: true, AddItem: 'D1' }, 
    { key: 69, boardNumber: 7, name: '', invisible: true, AddItem: 'D1' }, 
    { key: 70, boardNumber: 10, name: '' },
    { key: 71, boardNumber: 27, name: '' }, 
    { key: 72, name: '', invisible: true }, 
    { key: 73, name: '', invisible: true }, 
    { key: 74, name: '', invisible: true },
    { key: 75, name: '', invisible: true }, 
    { key: 76, name: '', invisible: true }, 
    { key: 77, boardNumber: 11, name: '' },
    { key: 78, boardNumber: 26, name: '', extraScore: 1 }, 
    { key: 79, name: '', invisible: true }, 
    { key: 80, name: '', invisible: true }, 
    { key: 81, name: '', invisible: true },
    { key: 82, name: '', invisible: true }, 
    { key: 83, name: '', invisible: true }, 
    { key: 84, boardNumber: 12, name: '' },
    { key: 85, boardNumber: 25, name: '' }, 
    { key: 86, name: '', invisible: true }, 
    { key: 87, boardNumber: 5, name: '', invisible: true, addItem: 'D2'  }, 
    { key: 88, boardNumber: 4, name: '', invisible: true, addItem: 'D2'  },
    { key: 89, boardNumber: 3, name: '', invisible: true, addItem: 'D2'  }, 
    { key: 90, name: '', invisible: true }, 
    { key: 91, boardNumber: 13, name: '' },
    { key: 92, boardNumber: 24, name: '' }, 
    { key: 93, name: '', invisible: true }, 
    { key: 94, boardNumber: 6, name: '', invisible: true, addItem: 'D2'  }, 
    { key: 95, name: '', invisible: true },
    { key: 96, boardNumber: 2, name: '', invisible: true, addItem: 'D2' }, 
    { key: 97, name: '', invisible: true }, 
    { key: 98, boardNumber: 14, name: '', extraScore: 1 },
    { key: 99, boardNumber: 23, name: '' }, 
    { key:100, name: '', invisible: true }, 
    { key:101, boardNumber: 7 , name: '', invisible: true, addItem: 'D2' }, 
    { key:102, name: '', invisible: true },
    { key:103, boardNumber: 1, name: '', invisible: true, extraScore: 1 }, 
    { key:104, name: '', invisible: true }, 
    { key:105, boardNumber: 15, name: '' },
    { key:106, boardNumber: 22, name: '', extraScore: -1 }, 
    { key:107, boardNumber: 21, name: '' }, 
    { key:108, boardNumber: 20, name: '' }, 
    { key:109, boardNumber: 19, name: '', DeleteItem: 'D2', extraScore: 1 },
    { key:110, boardNumber: 18, name: '', itemsToAdd: 'D2' }, 
    { key:111, boardNumber: 17, name: '' }, 
    { key:112, boardNumber: 16, name: '', extraScore: -1 },
  ];

export { newBoard };
