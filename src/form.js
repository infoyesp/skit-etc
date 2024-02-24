import React from 'react';
import firebase from './firebase';
import "./App.css"; // Import your CSS file

class App extends React.Component {
    state = {
        name: '',
        phoneNumber: '',
        collegeEmail: '',
        edcEmail: '',
        team: '',
        message: ''
    };
    
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };
    
    handleSubmit = (e) => {
      e.preventDefault();
  
      const { name, phoneNumber, collegeEmail, edcEmail, team, message } = this.state;
  
      const formSubmissionsRef = firebase.database().ref('formSubmissions');
  
      formSubmissionsRef.push({
          name,
          phoneNumber,
          collegeEmail,
          edcEmail,
          team
      })
      .then(() => {
          this.setState({
              name: '',
              phoneNumber: '',
              collegeEmail: '',
              edcEmail: '',
              team: ''
          });
          alert("Your form has been submitted successfully. Our team will contact you soon.");
      })
      .catch((error) => {
          console.error("Error saving form data:", error);
          alert("There was an error submitting your form. Please try again later.");
      });
  };
  

    render() {
        return (
            <div className="app-container container"> {/* Added className */}
                <div className="skct-edc-form">
                    <h2>Skct Edc Team</h2>
                    <form className="contact-form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input type="text" id="name" name="name" placeholder="Your Name" required onChange={this.handleChange} value={this.state.name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Your Phone Number</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Your Phone Number" required onChange={this.handleChange} value={this.state.phoneNumber} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="collegeEmail">Your College Email</label>
                            <input type="email" id="collegeEmail" name="collegeEmail" placeholder="Your College Email" required onChange={this.handleChange} value={this.state.collegeEmail} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="edcEmail">Your EDC Email</label>
                            <input type="email" id="edcEmail" name="edcEmail" placeholder="Your EDC Email" required onChange={this.handleChange} value={this.state.edcEmail} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="team">Select Team</label>
                            <select id="team" name="team" onChange={this.handleChange} value={this.state.team} required>
                                <option value="">Select Team</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Technical">Technical</option>
                                <option value="Management">Management</option>
                            </select>
                        </div>
                        
                        <button type="submit">Submit Form</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default App;
