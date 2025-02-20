import { useState } from "react";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <header className="w-full max-w-4xl bg-white shadow-md p-4 rounded-lg flex justify-between items-center">
        <h1 className="text-2xl text-primary font-bold">Task Management</h1>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Add Task</button>
      </header>
      
      <main className="w-full max-w-4xl mt-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* To Do Column */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-3 text-primary">To Do</h2>
            <ul className="space-y-2">
              <li className="bg-primary p-3 rounded-md">Task 1</li>
              <li className="bg-primary p-3 rounded-md">Task 2</li>
            </ul>
          </div>
          
          {/* In Progress Column */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl text-blue-500 font-semibold mb-3">In Progress</h2>
            <ul className="space-y-2">
              <li className="bg-blue-500  p-3 rounded-md">Task 3</li>
            </ul>
          </div>
          
          {/* Completed Column */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-3  text-green-500">Completed</h2>
            <ul className="space-y-2">
              <li className="bg-green-500 p-3 rounded-md">Task 4</li>
            </ul>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-primary bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-primary">Add Task</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-primary">Title</label>
                <input type="text" className="input border-primary bg-white text-primary input-bordered w-full" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-primary">Description</label>
                <textarea className="textarea border-primary bg-white text-primary textarea-bordered w-full"></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-primary">Date</label>
                <input type="date" className="input border-primary bg-white text-primary input-bordered w-full" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-primary">Category</label>
                <select className="select select-bordered w-full border-primary bg-white text-primary">
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default Home;