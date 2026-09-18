import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import SubjectsList from './pages/SubjectsList'
import SubjectPage from './pages/SubjectPage'
import TopicPage from './pages/TopicPage'
import SearchPage from './pages/SearchPage'
import StudyOrderPage from './pages/StudyOrderPage'
import { NotesHome, NoteChapter } from './pages/NotesPages'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="subjects" element={<SubjectsList />} />
          <Route path="subjects/:subjectId" element={<SubjectPage />} />
          <Route path="subjects/:subjectId/:topicSlug" element={<TopicPage />} />
          <Route path="study-order" element={<StudyOrderPage />} />
          <Route path="notes" element={<NotesHome />} />
          <Route path="notes/:subjectKey" element={<NotesHome />} />
          <Route path="notes/:subjectKey/:chapterId" element={<NoteChapter />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
