import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

// Numeros aleatorios de Min = minimo até max = máximo
/* function getRandom(min, max) {
  return Math.floor(Math.random() * (min - max + 1) + min);
} */

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    // Explicação do professor para evitar criar id vazio.
    if(!newTaskTitle) return;
    
    const newTask = {
      //Quanto maior o Max maior menor a chance de repetir o id random.
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    };

    console.log(newTask.id);

    //Verificação se esta vazio // A verificação esta em cima agora.
    //if (newTaskTitle != ''){
      //Cria um novo arry com as informações de newTask
      setTasks([...tasks, newTask])
      setNewTaskTitle('')
    //}
    console.log(newTask)
  }

  function handleToggleTaskCompletion(id: number) {
    // Vai procurar o id dentro do array tasks
    // Quando en
    const search = tasks.map((data) => {
      if(data.id == id){
          data.isComplete = !data.isComplete;
      }
      return data;
    })
    setTasks(search);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    // Vai retornar todas as Task com o ID diferente do que a gente quer deletar
    // durante o processo
    const filteredTasks = tasks.filter(task => task.id != id);

    // Cria um novo estado.
    setTasks(filteredTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}