import React, { useEffect, useState } from 'react'
import styles from './task.module.scss'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import close from '../../public/close.png'

const Task = () => {

    const [title, setTitle]= useState('')
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const [project, setProject] = useState('');
    const [storedData , setStoredData]= useState([]);
    const [open , setOpen]= useState(false);

  

    useEffect(()=>{
        let data = localStorage.getItem('data')
        if(data){
            try{
                const parsedData = JSON.parse(data)
                setStoredData(parsedData)
            }
            catch(error){
                console.log(error);
                setStoredData([])
            }
        }
    },[])

    const handleTaskSubmit = (e)=>{
        e.preventDefault()
        const newTask = {
            id: Date.now(),
            title,
            startDate: startDate ? startDate.toISOString().substring(0,10) : '',
            endDate: endDate ? endDate.toISOString().substring(0,10) : '',
            status,
            description,
            project
        };
        const newData = [...storedData, newTask];
        localStorage.setItem('data', JSON.stringify(newData));
        setStoredData(newData);
        setTitle('')
        setStartDate(null)
        setEndDate(null)
        setStatus('')
        setProject('')
        setDescription('')
    }
    const handleDelete=()=>{
        setStoredData([])
        localStorage.setItem('data',JSON.stringify([]))
    }


    
  return (
    <>
    
        <div className={styles.task}>
            <div className={styles.divide}>
                <h3>Task</h3>
                <button onClick={()=>setOpen(true)}>Add New</button>
            </div>
            
            <div className={styles.inner}>
                <div className={styles.column}>
                    <p>Name</p>
                    <p>Project</p>
                    <p>Start Date </p>
                    <p>End Date</p>
                    <p>Status</p>
                    <p>Action</p>
                </div>

                <div className={styles.data}>
                    {storedData.map((item,index)=>{
                        return<>
                            <div className={styles.details} key={index}>
                                <div className={styles.name}>{item.title}</div>
                                <div className={styles.name}>{item.project}</div>
                                <div className={styles.name}>{item.startDate}</div>
                                <div className={styles.name}>{item.endDate}</div>
                                {item.status == 'Pending' && <div className={styles.status} style={{backgroundColor:'grey'}}>{item.status}</div>}
                                {item.status == 'OnGoing' && <div className={styles.status} style={{backgroundColor:'rgb(141, 142, 66)'}}>{item.status}</div>}
                                {item.status == 'Completed' && <div className={styles.status} >{item.status}</div>}
                                {item.status == '' && <div className={styles.status} >{item.status}</div>}
                                <div className={styles.action}>train</div>
                            </div>
                        </>
                    })}
                </div>
                {storedData && <button onClick={handleDelete}>Delete</button>}
                
            </div>

            
        </div>

        {open && 
        <div className={styles.assign}>
            <div className={styles.inner}>
                <h2>Add New Task</h2>
                <Image src={close} alt='' className={styles.close} onClick={()=>setOpen(false)}/>
                <form action="" onSubmit={handleTaskSubmit}>
                    
                    <div className={styles.title}>
                        <label for="">Title</label>
                        <div className={styles.input}>
                            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        </div>
                    </div>
                    
                    <div className={styles.dates}>
                        <div className={styles.date}>
                            <label htmlFor="">StartDate</label>
                            <div className={styles.input}>
                                <DatePicker
                                    className={styles.datepicker}
                                    
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                    dateFormat="dd-MM-yyyy" 
                                    showTimeSelect={false}
                                />
                            </div>
                        </div>
                        <div className={styles.date}>
                            <label htmlFor="">endDate</label>
                            <div className={styles.input}>
                                <DatePicker
                                    className={styles.datepicker}
                                    selected={endDate}
                                    onChange={date => setEndDate(date)}
                                    dateFormat="dd-MM-yyyy" 
                                    showTimeSelect={false}
                                />
                            </div>
                        </div>
                        
                        
                    </div>
                    <div className={styles.options}>
                        <div className={styles.option}>
                            <label htmlFor="select">Projects</label>
                            <div className={styles.input}>
                                <select id="select" value={project} onChange={(e)=>setProject(e.target.value)}>
                                    {!project && <option value="">Select ...</option>}
                                    <option value="Sport">Sport</option>
                                    <option value="API">API</option>
                                    <option value="RazorPay">RazorPay</option>
                                </select>
                            </div>
                        </div>


                        <div className={styles.option}>
                            <label htmlFor="select">Status</label>
                            <div className={styles.input}>
                                <select id="select" value={status} onChange={(e)=>setStatus(e.target.value)}>
                                    {!status && <option value="">Select Status</option>}
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="OnGoing">OnGoing</option>
                                </select>
                            </div>
                        </div>


                    </div>


                    <div className={styles.title}>
                        <label for="">Description</label>
                        <div className={styles.textarea}>
                            <textarea name="" id="" rows="5" cols="50" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                        </div>
                    </div>

                    <button type='submit'>Save</button>
                </form>
            </div>
        </div>
        }
    </>
  )
}

export default Task