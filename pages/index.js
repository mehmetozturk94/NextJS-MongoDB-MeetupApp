import Head from 'next/head'
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from 'react';

function HomePage(props) {
  
  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
        <meta name="description" content="Browse a Huge List of Highly Active Meetups"/>
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  )
  
}

//Data fetching for pre-rendering
export async function getStaticProps(){
  //fetch data from API
  const client = await MongoClient.connect('mongodb+srv://mehmetoz9443:12345678M@cluster0.rlk5m.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const collection = db.collection('meetups');

  const meetups = await collection.find().toArray();

  client.close();

  return{
    props: {
      meetups : meetups.map(meetup => ({
        title : meetup.title,
        image: meetup.image,
        address : meetup.address,
        description: meetup.description,
        id : meetup._id.toString(),
      }))
    },
    revalidate : 1
  }
}

export default HomePage;
