import React, { Component } from "react";
import UserProfile from "../../components/UserProfile/UserProfile";

class User extends Component {
  state = {
    username: "Leon Yao",
    subject: "IB Mathematics SL",
    examDate: "19th June",
    averageGrade: 6,
    subTopics: {
      "Functions and Equations": {
        "Function Basics(Domain, Range, Inverse)": 5,
        "Linear Functions": 6,
        "Composite Functions": 5,
        "Quadratic Functions": 5,
        "Reciprocal and Rational Functions": 4,
        "Logarithmic and Exponential Functions": 5,
        "Transformation of Graphs": 6,
      },
      Algebra: {
        "Arithmetic Progression": 5,
        "Compound Interest": 6,
        "Binomial Theorem": 5,
        "Geometric Progression": 5,
        Exponents: 4,
        Logarithms: 5,
      },
      Calculus: {
        "Chain Rule": 5,
        "Derivativies of Standard Functions": 6,
        "Integration by Substitution": 5,
        Kinematics: 5,
        "Product Rule": 4,
        "Indefinite Integration": 5,
        "Areas of Regions enclosed by Curves": 6,
        "Definite Integrals": 6,
        "Minimum/Maximum/Inflection points": 4,
        Optimisation: 5,
        "Quotient Rule": 4,
        "Tangents and Normals at a given point": 7,
        "Second Derivative (Concavity)": 5,
      },
      "Geometry and Trigonometry": {
        "Distances and Midway Points": 5,
        "Sine and Cosine Theorems": 6,
        "Pythagorean Identity": 5,
        "Double Angle Identity": 5,
        "Trigonometric Equations": 4,
        "Unit Circle": 5,
        "Circle Geometry": 6,
        "Volumes, Areas of 3D solids": 7,
        "Area of a Triangle": 5,
        "Circular Functions and Transformation": 6,
      },
      Statics: {
        "Probability Basics(Definition, Complementary Events)": 5,
        "Mean, Median, Mode": 6,
        "Box-and-Whisker Plots": 5,
        "Quartiles and Interquartile range": 5,
        "Venn Diagrams": 4,
        "Binomial Distribution": 5,
        "Independent Events": 6,
        "Cumulative Frequency": 7,
        "Normal Distribution": 5,
        "Conditional Probabilities": 6,
        Histograms: 6,
        "Linear Regression": 6,
        "Scatter Diagrams and Line of Best Fit": 6,
        "Linear Correlation and Correlation Coefficient": 6,
      },
    },
    subTopics: {
      "Functions and Equations": 6,
      Algebra: 5,
      Calculus: 4,
      "Geometry and Trigonometry": 6,
      Statics: 6,
    },
    suggestedTopics: {
      "Scatter Diagrams and Line of Best Fit": 7,
      "Normal Distribution": 5,
      "Trigonometric Equations": 4,
      "Reciprocal and Rational Functions": 4,
      Exponents: 4,
    },
    recentTests: ["14587", "24567", "92840"],
    scoreHistory: [50, 51, 68, 72, 80],
  };
  render() {
    return (
      <UserProfile
        username={this.state.username}
        subject={this.state.subject}
        examDate={this.state.examDate}
        averageGrade={this.state.averageGrade}
        subTopics={this.state.subTopics}
        scoreHistory={this.state.scoreHistory}
        suggestedTopics={this.state.suggestedTopics}
      />
    );
  }
}

export default User;
