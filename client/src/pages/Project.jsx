import { Link, useParams } from 'react-router-dom';  // useParams is a hook that allows you to access the URL parameters/id from the URL
import { useQuery } from '@apollo/client';
import Spinner from '../components/Spinner';
import ClientInfo from '../components/ClientInfo';
import DeleteProjectButton from '../components/DeleteProjectButton';
import EditProjectForm from '../components/EditProjectForm';
import { GET_PROJECT } from '../queries/projectQueries';


export default function Project() {
    const { id } = useParams();  // id is my URL parameter
    const { loading, error, data } = useQuery(GET_PROJECT, 
        
        {variables: { id }});  

        if (loading) return <Spinner />;
        if (error) return <p>Something Went Wrong :( </p>;

    
  return (
    <>
    {!loading && !error && (
      <div className='mx-auto w-50 card p-5'>
        <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
          Back
        </Link>

        <h1>{data.project.name}</h1>
        <p>{data.project.description}</p>

        <h5 className='mt-3'>Project Status</h5>
        <p className='lead'>{data.project.status}</p>

        <ClientInfo client={data.project.client} />

        <EditProjectForm project={data.project} />
        
        <DeleteProjectButton projectId={data.project.id} />

      </div>
    )}
  </>
  )
}
