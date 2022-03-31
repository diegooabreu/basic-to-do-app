import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (newTaskTitle.length != 0) {
      // nova task que será adicionada
      const tarefa: Task = {
        id: Math.floor(Math.random() * (9999 - 1 + 1)) + 1,
        title: newTaskTitle,
        isComplete: false,
      }
      //SETANDO NOVO VALOR PARA ARRAY DE TASKS, ADICIONANDO A VARIAVEL tarefa
      setTasks([...tasks, tarefa])
    }
    
          
  }

  function handleToggleTaskCompletion(idDaTask: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    // procura no array o index do item que tenha o id enviado como parametro
    const index = tasks.findIndex(x => x.id === idDaTask)
        

    // FAZ UMA COPIA DO ARRAY  PARA PODER USAR NO METODO setTasks APÓS ALTERARMOS O ITEM QUE QUEREMOS, MUDAMOS O ITEM COM O INDEX CERTO E USAMOS O METODO setTasks para mudar o estado
    let newTasks = [...tasks];

    if (tasks[index].isComplete){
      newTasks[index] = {id: tasks[index].id, title: tasks[index].title, isComplete: false}
      setTasks(newTasks);
    } else {
      newTasks[index] = {id: tasks[index].id, title: tasks[index].title, isComplete: true}
      setTasks(newTasks);
    }
    

  }

  function handleRemoveTask(idDaTask: number) {
    // Remova uma task da listagem pelo ID

    // procura no array o index do item que tenha o id enviado como parametro
    const index = tasks.findIndex(x => x.id === idDaTask)

    let newTasks = [...tasks];
    newTasks.splice(index, 1)
    setTasks(newTasks);

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
          <button type="submit" data-testid="add-task-button" onClick={() => handleCreateNewTask()}>
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