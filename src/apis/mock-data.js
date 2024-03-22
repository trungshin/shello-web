export const mockData = {
  board: {
    _id: 'board_id_01',
    title: 'TrungShin',
    description: 'TrungShin Build Shello App',
    type: 'public', // 'private'
    ownerIds: [],
    memberIds: [],
    columnOrderIds: ['column_id_01', 'column_id_02', 'column_id_03'],
    columns: [
      {
        _id: 'column_id_01',
        boardId: 'board_id_01',
        title: 'To Do Column 01',
        cardOrderIds: ['card_id_01', 'card_id_02', 'card_id_03', 'card_id_04', 'card_id_05', 'card_id_06', 'card_id_07'],
        cards: [
          {
            _id: 'card_id_01',
            boardId: 'board_id_01',
            columnId: 'column_id_01',
            title: 'Title of card 01',
            description: 'Descript of card 01',
            cover: 'https://static1.srcdn.com/wordpress/wp-content/uploads/2023/11/one-piece-manga-1.jpg',
            memberIds: ['test_user_id_01'],
            comments: ['test comment 01', 'test comment 02'],
            attachments: ['test attachment 01', 'test attachment 02', 'test attachment 03']
          },
          { _id: 'card_id_02', boardId: 'board_id_01', columnId: 'column_id_01', title: 'Title of card 02', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card_id_03', boardId: 'board_id_01', columnId: 'column_id_01', title: 'Title of card 03', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card_id_04', boardId: 'board_id_01', columnId: 'column_id_01', title: 'Title of card 04', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card_id_05', boardId: 'board_id_01', columnId: 'column_id_01', title: 'Title of card 05', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card_id_06', boardId: 'board_id_01', columnId: 'column_id_01', title: 'Title of card 06', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card_id_07', boardId: 'board_id_01', columnId: 'column_id_01', title: 'Title of card 07', description: null, cover: null, memberIds: [], comments: [], attachments: [] }
        ]
      },
      {
        _id: 'column_id_02',
        boardId: 'board_id_01',
        title: 'Inprogress Column 02',
        cardOrderIds: ['card_id_08', 'card_id_09', 'card_id_10'],
        cards: [
          { _id: 'card_id_08', boardId: 'board_id_01', columnId: 'column_id_02', title: 'Title of card 08', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card_id_09', boardId: 'board_id_01', columnId: 'column_id_02', title: 'Title of card 09', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card_id_10', boardId: 'board_id_01', columnId: 'column_id_02', title: 'Title of card 10', description: null, cover: null, memberIds: [], comments: [], attachments: [] }
        ]
      },
      {
        _id: 'column_id_03',
        boardId: 'board_id_01',
        title: 'Done Column 03',
        cardOrderIds: ['card_id_11', 'card_id_12', 'card_id_13'],
        cards: [
          { _id: 'card_id_11', boardId: 'board_id_01', columnId: 'column_id_03', title: 'Title of card 11', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card_id_12', boardId: 'board_id_01', columnId: 'column_id_03', title: 'Title of card 12', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card_id_13', boardId: 'board_id_01', columnId: 'column_id_03', title: 'Title of card 13', description: null, cover: null, memberIds: [], comments: [], attachments: [] }
        ]
      }
    ]
  }
}