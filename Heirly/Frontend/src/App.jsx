import GetAllJobs from './hooks/GetAllJobs';
import MainRouting from './routes/MainRouting';

 function App() {
   GetAllJobs()
  return (
    <div>
      <MainRouting />
    </div>
  )
}

export default App