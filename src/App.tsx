//App.tsx
import { BrowserRouter} from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { PrivateRoute} from './components/PrivateRoute'
import { Home } from './components/Home'
import { StudentRegistrationForm } from './components/Student/StudentRegistrationForm'
import { LandingPage } from './components/LandingPage'
import { StudentPersonalDetailsTable } from './components/Student/StudentPersonalDetailsTable'
import { StudentSecondarySchoolTable } from './components/Student/StudentSecondarySchool'
import { StudentScholarshipTable } from './components/Student/StudentScholarship'
import { AuthProvider } from './components/Authentication/AuthContext';
import { StudentIDDetailsTable } from './components/Student/StudentIDDetails'
import { StudentExternalContactDetails } from './components/Student/StudentExternalContact'
import { StudentUpdate } from './components/Student/StudentUpdate'
import { StudentDelete } from './components/Student/StudentDelete'
import { StudentHighSchoolTable } from './components/Student/StudentHighSchool'
import { SignUp } from './components/SignUp'
import { StudentDetailsAllTable } from './components/Student/StudentDetailsAll'
import './App.css'
import { StudentUpdateForm } from './components/Student/StudentUpdateForm'

function App() {

  return (
     <AuthProvider>

        <BrowserRouter>
          <Routes>

            <Route path="*" element={<Home />}></Route>
            <Route path="/login" element={<Home />}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>

            <Route element={<PrivateRoute />}>
  
              <Route path="/landing" element={<LandingPage/>}></Route>
              <Route path="/student/all" element={<StudentDetailsAllTable/>}></Route>
              <Route path="/student/new" element={<StudentRegistrationForm/>}></Route>
              <Route path="/student/update" element={<StudentUpdate/>}></Route>
              <Route path="/student/update/:id" element={<StudentUpdateForm/>}></Route>
              <Route path="/student/delete" element={<StudentDelete/>}></Route>

              <Route path="/student/me" element={<StudentPersonalDetailsTable />}></Route>
              <Route path="/student/me/id-details" element={<StudentIDDetailsTable/>}></Route>
              <Route path="/student/me/external-contact" element={<StudentExternalContactDetails/>}></Route>
              <Route path="/student/me/secondary-school" element={<StudentSecondarySchoolTable/>}></Route>
              <Route path="/student/me/high-school" element={<StudentHighSchoolTable/>}></Route>
              <Route path="/student/me/scholarship" element={<StudentScholarshipTable/>}></Route>

            </Route>

          </Routes>
        </BrowserRouter>

      </AuthProvider>
  )
}

export default App
