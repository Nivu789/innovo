import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useFetchUiPageComponents } from '../../hooks/adminhooks/useFetchUiPageComponent'
import UiComponentCard from '../../components/adminComponents/UiComponentCard'
import EditUiSection from './EditUiSection'

const EditUI = () => {
    const [refetch, setRefetch] = useState(false)
    const { pageName } = useParams()
    const { data, loading } = useFetchUiPageComponents({ pageName, refetch })
    const [sectionData, setSectionData] = useState([])

    const [heading, setHeading] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [headingError, setHeadingError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)

    const [erros, setErrors] = useState([
        {
            headingError: ""
        },
        {
            descriptionError: ""
        }
    ])

    useEffect(() => {
        // console.log(heading.length)
        if (heading.trim() == "" || heading.length < 4) {
            setHeadingError(true)
            setErrors({ ...erros, headingError: "heading cannot be less than 4 characters or cannot be spaces" })
        } else {
            setHeadingError(false)
            setErrors({ ...erros, headingError: null })
        }


        // console.log(erros)
    }, [heading])

    useEffect(() => {
        if (description.trim() == "" || description.length < 4) {
            setDescriptionError(true)
            setErrors({ ...erros, descriptionError: "description cannot be less than 4 characters or cannot be spaces" })
        } else {
            setDescriptionError(false)
            setErrors({ ...erros, descriptionError: null })
        }
    }, [description])

    return (
        <>
            <div className='ps-3 w-100 pe-3' style={{ height: "100vh" }}>

                <div className='row' style={{ height: "93%" }}>

                    <div className='col h-100 pe-4 ps-4 d-flex flex-column gap-3 pt-2' style={{ borderRight: "2px solid black" }}>
                        <div className='fs-2'>EditUI</div>
                        {
                            loading ?
                                <div>Loading Data.....</div>

                                :

                                data.map((item, index) => (
                                    <UiComponentCard data={item} pageName={pageName} key={index} setSectionData={setSectionData} refetch={refetch} />
                                ))
                        }
                    </div>

                    <div className='col pe-4 ps-4 d-flex flex-column pt-2 gap-3' style={{ height: "100%" }}>
                        <div className='d-flex justify-content-between'><div className='fs-2'>EditSection </div><button className='rounded btn btn-info' data-bs-toggle="modal" data-bs-target={`#exampleModal`}>Add Item</button></div>
                        <EditUiSection sectionData={sectionData} refetch={refetch} setRefetch={setRefetch} />
                    </div>
                </div>
            </div>


            <div class="modal fade" id={`exampleModal`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Heading</label>
                                    <input required type="text" value={heading} onChange={(e)=>setHeading(e.target.value)} class={`form-control`} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <div className='d-flex gap-1 mt-1'>{erros.headingError ? <div className='text-danger'>{erros.headingError}</div> : <div className='text-success'>Great</div>}<i class={`bi ${headingError ? "bi-hand-thumbs-down text-danger" : "bi-hand-thumbs-up text-success"}`}></i></div>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Description</label>
                                    <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} class={`form-control`} id="exampleInputPassword1" />
                                    <div className='d-flex gap-1 mt-1'>{erros.descriptionError ? <div className='text-danger'>{erros.descriptionError}</div> : <div className='text-success'>Great</div>}<i class={`bi ${descriptionError ? "bi-hand-thumbs-down text-danger" : "bi-hand-thumbs-up text-success"}`}></i></div>
                                </div>

                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Image</label>
                                    <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} class="form-control" id="exampleInputImage" />
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EditUI