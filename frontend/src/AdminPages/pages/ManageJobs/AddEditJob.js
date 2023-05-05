import React, { useState , useEffect } from 'react';
import {useNavigate, Link, useParams} from 'react-router-dom';
// import './Style/AddEdit.css';
import axios from 'axios';
import { toast } from 'react-toastify';


const initialState = {
    Position : "",
    Description : "",
    Offer : "",
    MaxCandidateNumber : "",
    Qualification : "",
};
let selected=[];
const AddEditJob = () => {
const[data, setData] = useState([]);

function selectedhandle(e){
   
    selected.push(e);
    console.log(selected);
   
}

const loadData = async () => {
    const respons = await axios.get("http://localhost:5000/api/get-qualifications");
    setData(respons.data);
};

useEffect(() =>{
    loadData();
    selected=[];
},[]);

        const [state, setState] = useState(initialState);

        const {Position, Description, Offer, MaxCandidateNumber, Qualification} = state;

        const navigate = useNavigate();

        const {ID} = useParams();

            // select Spasific job
            useEffect(() => {
                axios.get(`http://localhost:5000/api/get-job/${ID}`).then((resp) => {setState({ ...resp.data[0]})})
            },[ID])
            const handleSubmit = (e) => {
                e.preventDefault();
                initialState.Qualification='test';
                if(!Position || !Description || !Offer ||  !MaxCandidateNumber ){
                    toast.error("Please Provide value into each input field");
        
                }
                else{
                    // Add Job
                    if(!ID){
                        axios.post("http://localhost:5000/api/post-job", {
                            Position,
                            Description,
                            Offer,
                            MaxCandidateNumber,
                            Qualification,
                            selected,
                        }).then(()=>{
                            setState({ Position:"", Description:"", Offer:"", MaxCandidateNumber:"", Qualification:""});
                        }).catch((err) => toast.error(err.response.data));
                        toast.success("Job Added Successfully");
        
                        // Update Job
                    } else{
                        console.log(selected);
                        axios.put(`http://localhost:5000/api/update-job/${ID}`, {
                            Position,
                            Description,
                            Offer,
                            MaxCandidateNumber,
                            Qualification,
                            selected,
        
                        }).then(()=>{
                            setState({ Position:"", Description:"", Offer:"", MaxCandidateNumber:"", Qualification:""});
                        }).catch((err) => toast.error(err.response.data));
                        toast.success("Job Updated Successfully");
                    }
        
                    setTimeout(() => navigate("/jobs"), 500);
                }
            };

        const handleInputChange = (e) =>{
            const {name, value} =  e.target;
            setState({...state, [name]: value});
         };
     


    return (
        <div style={{marginTop : "100px"}}>
        
        <form  style={{
            margin : "auto",
            padding : "15px",
            maxWidth : "400px",
            alignContent : 'center'
        }}
            onSubmit = {handleSubmit} 
        >
            <label htmlFor='Position'>Position</label>
            <input 
            type="text"
            id='Position'
            name='Position'
            placeholder=' Position ...'
            value={Position || ""}
            onChange={handleInputChange}
            />

            <label htmlFor='Description'>Description</label>
            <textarea name="Description"
            value={Description} 
            onChange={handleInputChange}
            className="form-control"
            id="" cols="30" rows="5">
            </textarea>
            
            <label htmlFor='Offer'>Offer</label>
            <input 
            type="number"
            id='Offer'
            name='Offer'
            placeholder='Offer ...'
            value={Offer || ""}
            onChange={handleInputChange}
            />
            <label htmlFor='MaxCandidateNumber'>MaxCandidateNumber</label>
            <input 
            type="number"
            id='MaxCandidateNumber'
            name='MaxCandidateNumber'
            placeholder='MaxCandidateNumber ...'
            value={MaxCandidateNumber || ""}
            onChange={handleInputChange}
            />

           
            {data.map((item,index)=>{
                    return(
                        <div className='checkbox'>
                      <input onChange={(e)=>{selectedhandle(e.target.value)}} type='checkbox'name={item.description}value={item.id}></input>
                      <label htmlFor={item.description}>
                       { item.description}
                      </label>

                      </div>
                    );
                })};
                    
            <input type="submit" value={ID ? "Update" : "save"}/>
            <Link to={"/jobs"}>
                <input type="button" value={"Go Back"}/>
            </Link>
        </form>    
    </div>
    );
};

export default AddEditJob;