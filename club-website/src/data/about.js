// Add portraits in src/assets and set photo to the imported image.
// Use photoPosition (for example '70% center') to adjust the detail card crop.
const profilePlaceholder = {
  name: 'Họ và tên',
  bio: 'Phần giới thiệu về thành viên sẽ được cập nhật.',
  photo: null,
}

export const leadership = {
  ...profilePlaceholder,
  id: 'president',
  role: 'Chủ nhiệm',
  reports: [
    {
      ...profilePlaceholder,
      id: 'vice-operations',
      role: 'Phó chủ nhiệm',
      area: 'Truyền thông và hậu cần',
      reports: [
        { ...profilePlaceholder, id: 'communications', role: 'Trưởng ban truyền thông' },
        { ...profilePlaceholder, id: 'logistics', role: 'Trưởng ban hậu cần' },
      ],
    },
    {
      ...profilePlaceholder,
      id: 'vice-academic',
      role: 'Phó chủ nhiệm',
      area: 'Chuyên môn',
      reports: [
        { ...profilePlaceholder, id: 'academic-lead', role: 'Trưởng ban chuyên môn' },
        { ...profilePlaceholder, id: 'academic-deputy', role: 'Phó ban chuyên môn' },
      ],
    },
  ],
}

export const clubOverview = {
  introduction: 'Tìm hiểu về câu lạc bộ, ban chủ nhiệm và những hoạt động nổi bật.',
  mission: 'Thông tin về sứ mệnh của câu lạc bộ sẽ được cập nhật.',
  vision: 'Thông tin về tầm nhìn của câu lạc bộ sẽ được cập nhật.',
  founded: '….',
  members: '….',
}

// Set photo to an imported image for each showcase. photoPosition adjusts its crop.
export const showcases = [
  {
    id: 'club-achievements',
    title: 'Thành tích câu lạc bộ',
    brief: 'Các giải thưởng, chứng nhận và cột mốc nổi bật sẽ được cập nhật.',
    description: 'Thông tin chi tiết về các thành tích của câu lạc bộ sẽ được cập nhật.',
    photo: null,
  },
  {
    id: 'member-achievements',
    title: 'Thành tích thành viên',
    brief: 'Kết quả tại VNOI, Olympic và các kỳ thi học sinh giỏi sẽ được cập nhật.',
    description: 'Thông tin chi tiết về thành tích của từng thành viên sẽ được cập nhật.',
    photo: null,
  },
  {
    id: 'first-event',
    title: 'Sự kiện đặc biệt 1',
    brief: 'Phần giới thiệu ngắn về sự kiện sẽ được cập nhật.',
    description: 'Thông tin chi tiết về sự kiện sẽ được cập nhật.',
    photo: null,
  },
  {
    id: 'second-event',
    title: 'Sự kiện đặc biệt 2',
    brief: 'Phần giới thiệu ngắn về sự kiện sẽ được cập nhật.',
    description: 'Thông tin chi tiết về sự kiện sẽ được cập nhật.',
    photo: null,
  },
  {
    id: 'third-event',
    title: 'Sự kiện đặc biệt 3',
    brief: 'Phần giới thiệu ngắn về sự kiện sẽ được cập nhật.',
    description: 'Thông tin chi tiết về sự kiện sẽ được cập nhật.',
    photo: null,
  },
]
