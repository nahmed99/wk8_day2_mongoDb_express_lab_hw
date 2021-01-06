import {useState} from "react";
import { postSighting } from "./SightingService";

const SightingsForm = ({addSighting}) => {
    
    const [formData, setFormData] = useState({})

    const onChange = (e) =>{
        formData[e.target.id] = e.target.value;
        setFormData(formData);
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        postSighting(formData).then(()=>{
            addSighting(formData);
        })
    }

    return (
        <form onSubmit={onSubmit} id="sightings-form" >
            <h2>Add a Sighting</h2>
            <div class="formWrap">
                <label for="species">Species:</label>
                <input onChange={onChange} type="text" id="species"  />
            </div>
            <div class="formWrap">
                <label for="location">Location:</label>
                <input onChange={onChange} type="text" id="location"  />
            </div>
            <div class="formWrap">
                <label for="date">Date:</label>
                <input onChange={onChange} type="date" id="date"  />
            </div>

            <input type="submit" value="Save" id="save"/>
	    </form>

    );
}

export default SightingsForm;