import React, { Component } from 'react';
import firebase from './firebase';
import './admin.css'

class App extends Component {
    state = {
        formData: [],
        loading: true
    };

    componentDidMount() {
        // Reference to the 'formSubmissions' node in Firebase Realtime Database
        const formSubmissionsRef = firebase.database().ref('formSubmissions');

        // Fetch data from Firebase
        formSubmissionsRef.once('value', snapshot => {
            const formData = [];
            snapshot.forEach(childSnapshot => {
                const data = childSnapshot.val();
                formData.push(data);
            });
            this.setState({ formData: formData, loading: false });
        }, error => {
            console.error("Error fetching form data:", error);
            this.setState({ loading: false });
        });
    }

    render() {
        const { formData, loading } = this.state;

        return (
            <div className="app-container container">
                <div className="skct-edc-form">
                    <h2>FormSubmissions</h2>
                   
                    <div className="form-submissions">
                        <h3>Form Submissions</h3>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            formData.map((data, index) => (
                                <div key={index} className="submission">
                                    <p>Name: {data.name}</p>
                                    <p>Phone Number: {data.phoneNumber}</p>
                                    <p>College Email: {data.collegeEmail}</p>
                                    <p>EDC Email: {data.edcEmail}</p>
                                    <p>Team: {data.team}</p>
                                    {/* <p>Message: {data.message}</p> */}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
