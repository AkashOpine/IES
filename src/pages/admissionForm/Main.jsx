import React, { useEffect, useState } from "react";
import AdmissionForm from "./AdmissionForm";
import ParentDetials from "./ParentDetials";
import OthersSection from "./OthersSection";
import MarkSection from "./MarkSection";
import axios from "axios";
import Submited from "./Submited";

function Main() {
  const [datas, setData] = useState(1);

  // admission form datas
  const [formData, setFormData] = useState({
    classOfAdmission:"",
    Name:"",
    Dob:"",
    AadhaarNo:"",
    Country:"",
    MotherTongue:"",
    Religion:"",
    Caste:"",
    HouseName:"",
    Category:"333",
    PlaceStreet:"",
    PostOffice:"",
    PremState:"",
    Pincode:"",
    p_country:"",
    prev_SchoolName:"",
    prev_Class:"",
    prev_Board:"",
    Prev_State:"",
    Prev_Country:"",
  });
  const [countries, setCountries] = useState([]);
  const [religions, setReligions] = useState([]);
  const [classOfAdmission, setClassofAdmission] = useState([]);
  const [categeory, setCategeory] = useState([]);
  const [gender, setGender] = useState("Male");
  const GenderSelect = (name) => {
    setGender(name);
  };

  const [year, setYear] = useState("2024-2025");
  const YearSelect = (name) => {
    setYear(name);
  };

  const [accomadation, setAccomadation] = useState("");
  const accomadationSelect = (name) => {
    setAccomadation(name);
  };

  const [relatives, setRelatives] = useState("");
  const Relatives = (name) => {
    setRelatives(name);
  };

  const [icseCourse, setIcseCourse] = useState("Science");
  const IcseCourse = (name) => {
    setIcseCourse(name);
  };
  const [checkboxes, setCheckboxes] = useState({
    father: true,
    mother: false,
    guardian: false,
  });
  const [selectedCheckbox, setSelectedCheckbox] = useState("");

  const handleCheckboxClick = (checkboxName) => {
    const updatedCheckboxes = { ...checkboxes };

    updatedCheckboxes[checkboxName] = !updatedCheckboxes[checkboxName];

    if (updatedCheckboxes[checkboxName]) {
      for (let key in updatedCheckboxes) {
        if (key !== checkboxName) {
          updatedCheckboxes[key] = false;
        }
      }
      setSelectedCheckbox(checkboxName);
    } else {
      setSelectedCheckbox("");
    }

    setCheckboxes(updatedCheckboxes);
  };

  useEffect(() => {
    const anyCheckboxSelected = Object.values(checkboxes).some((value) => value);
    if (!anyCheckboxSelected) {
      setCheckboxes({ ...checkboxes, father: true });
      setSelectedCheckbox('father');
    }
  }, [checkboxes]);
  const [selectedCategory, setSelectedCategory] = useState("333");
  const CategeorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setFormData({
      ...formData,
      Category: categoryId,
    });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const [checkadhaar, setcheckadhaar] = useState(false);

  const handleSubmit = (e) => {
    if (!checkadhaar) {
   
      setData(1);
    
    } else {

      setData(2);
    
    }
  };
  useEffect(() => {
    fetchCountries();
    fetchReligions();
    fetchCourse();
    fetchClass();
    fetchCategory();
  }, []);

  const fetchCountries = async () => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("type", "country");

      const response = await axios.post(
        "https://educationerp.in/pre_reg/index.php/Settings_List",
        bodyFormData
      );

      setCountries(response?.data?.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchReligions = async () => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("type", "religion");

      const response = await axios.post(
        "https://educationerp.in/pre_reg/index.php/Settings_List",
        bodyFormData
      );

   
      setReligions(response?.data?.data);
 
    } catch (error) {
      console.error("Error fetching Religion:", error);
    }
  };

  const fetchClass = async () => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("type", "Class");

      const response = await axios.post(
        "https://educationerp.in/pre_reg/index.php/Class_list",
        bodyFormData
      );

      setClassofAdmission(response?.data?.data);

    } catch (error) {
      console.error("Error fetching Class:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("type", "religion_category");

      const response = await axios.post(
        "https://educationerp.in/pre_reg/index.php/Settings_List",
        bodyFormData
      );
      setCategeory(response?.data?.data);
     
    } catch (error) {
      console.error("Error fetching Category:", error);
    }
  };

  // parent detials datas

  const [parentData, setParentData] = useState({
    FathersName:"",
    FathersEmail:"",
    FathersNumber:"",
    FathersOccupation:"",

    MothersName:"",
    MothersEmail:"",
    MothersNumber:"",
    MothersOccupation:"",

    GuardianRelation:"",
    DescribedRelation:"",
    GuardianName:"",
    GuardianEmail:"",
    GuardianNumber:"",
    GuardianOccupation:"",

  });
  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    setParentData({ ...parentData, [name]: value });
  };
  const [isFormValid, setIsFormValid] = useState(false);
  const [alertShow, setalertShow] = useState(false);
  const [emailVaid, setemailVaid] = useState(false);
  const [checkNumber, setcheckNumber] = useState(false);

  useEffect(() => {
   
    const atLeastOneCheckboxSelected =
      checkboxes.father || checkboxes.mother || checkboxes.guardian; 
    setIsFormValid(atLeastOneCheckboxSelected);
  }, [checkboxes]);



  const handleNextButton = (e) => {
    if (!isFormValid) {
      e.preventDefault(); 
      setalertShow(true);
      setData(2);
      console.log("ceckbox",isFormValid);
    } else if (!emailVaid) {
      e.preventDefault();
console.log("email",emailVaid);
      setData(2);
    } else if (!checkNumber) {
      e.preventDefault();
      console.log("number",checkNumber);
      setData(2);
    } else if (
      formData.classOfAdmission === "13" ||
      formData.classOfAdmission === "14"
    ) {
      e.preventDefault();
      setData(3);
    } else  {
      e.preventDefault();
      setData(4);
    }
  };

  const handlePrevButton = () => {
    setData(1);
  };

  // mark detials datas

  const [markData, setMarkData] = useState({
    Board:"",

    MarkiNEnglish:"",
    MarkiNMaths:"",
    MarkiNSocialScience:"",
    MarkiNLanguage:"",
    MarkiNMalayalam1:"",
    MarkiNPhysics:"",
    MarkiNChemistry:"",
    MarkiNBiology:"",
    MarkiNHindi:"",
    MarkiNComputerApplication:"",
    Language:"",
    OptionalSubject:"",
    MarkiNOptionalSubject:"",
    MarkiNScience:"",
  });

  const handleInputChange3 = (event) => {
    const { name, value } = event.target;
    if (name === 'Board') {
      setMarkData({
        ...markData,
        [name]: value,
        MarkiNEnglish:"",
        MarkiNMaths:"",
        MarkiNSocialScience:"",
        MarkiNLanguage:"",
        MarkiNMalayalam1:"",
        MarkiNPhysics:"",
        MarkiNChemistry:"",
        MarkiNBiology:"",
        MarkiNHindi:"",
        MarkiNComputerApplication:"",
        Language:"",
        OptionalSubject:"",
        MarkiNOptionalSubject:"",
        MarkiNScience:"",
      });
    } else {
      setMarkData({
        ...markData,
        [name]: value,
      });
    }
  };


 

  const handleNextButton3 = () => {
    setData(4);
  };
  const handlePrevButton3 = () => {
    setData(2);
  };
  const [selectInputs, setSelectInputs] = useState([
    { id: 0, categoryType: "", selectedOption: [], textInput: {},SelectedSubCourse:"",selectedMainCourse:"" },
    { id: 1, categoryType: "", selectedOption: [], textInput: {},SelectedSubCourse:"",selectedMainCourse:"" },
    { id: 2, categoryType: "", selectedOption: [], textInput: {},SelectedSubCourse:"",selectedMainCourse:"" },
  ]);
  const [options, setoption] = useState([]);


  

  
  const selectCourse = (id, field, value) => {
    setSelectInputs(prevState => {
      const updatedInputs = prevState.map(input => {
        if (input.id === id) {
          return {
            ...input,
            [field]: value
          };
        }
        return input;
      });
      return updatedInputs;
    });
  };


  const fetchCourse = async () => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("type", "higher_secondary_course_type");

      const response = await axios.post(
        "https://educationerp.in/pre_reg/index.php/Settings_List",
        bodyFormData
      );

      if (response?.data.status === 200) {
        setoption(response?.data.data);
      }
    } catch (error) {
      console.error("Error fetching Course:", error);
    }
  };
  

  const handleCategoryTypeChange = async (id, value) => {
    const bodyFormData = new FormData();
    bodyFormData.append("course", value);

    try {
      const response1 = await axios.post(
        "https://educationerp.in/pre_reg/index.php/Course_list_main",
        bodyFormData
      );
      const response2 = await axios.post(
        "https://educationerp.in/pre_reg/index.php/Course_list_sub",
        bodyFormData
      );
     
      const data1 = response1?.data.data;
     
     
      const data2 = response2?.data.data;
      setSelectInputs(prevState => ({
        ...prevState,
        course: value
      }));
      const updatedInputs = selectInputs.map((input) => {
        if (input.id === id) {
          return {
            ...input,
            textInput: data1,
            selectedOption: data2,
            categoryType: value,
          };
          
        }
        return input;
      });
   
      setSelectInputs(updatedInputs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  
  // others section datas

  const [otherData, setOtherData] = useState({
    WhatsappNumber:"",

    identificationMark:"",
    ExtraCaricularActivity:"",
    CareerAims:"",
    SiblingsName:"",
    SiblingsAdissionNo:"",
  });

  const handleInputChange4 = (event) => {
    const { name, value } = event.target;
    setOtherData({ ...otherData, [name]: value });
  };

  // Include courseData as a dependency here

const [studentId, setStudentId] = useState()

  const handleSubmitButton = (e) => {
    e.preventDefault();

    submit();
  };
  const submit = async () => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("academic_year", year);
      bodyFormData.append("class_of_admission", formData.classOfAdmission);
      bodyFormData.append("student_name", formData.Name);
      bodyFormData.append("dob", formData.Dob);
      bodyFormData.append("aadhar_no", formData.AadhaarNo);
      bodyFormData.append("gender", gender);
      bodyFormData.append("country", formData.Country);
      bodyFormData.append("religion", formData.Religion);
      bodyFormData.append("mother_toung", formData.MotherTongue);
      bodyFormData.append("cast", formData.Caste);
      bodyFormData.append("category", categeory);

      bodyFormData.append("prev_school_name", formData.prev_SchoolName);
      bodyFormData.append("prev_clas", formData.prev_Class);
      bodyFormData.append("prev_school_board", formData.prev_Board);
      bodyFormData.append("prev_school_state", formData.Prev_State);
      bodyFormData.append("prev_school_country", formData.Prev_Country);

      bodyFormData.append("p_house_name", formData.HouseName);
      bodyFormData.append("p_place_street", formData.PlaceStreet);
      bodyFormData.append("p_post_office", formData.PostOffice);
      bodyFormData.append("p_state", formData.PremState);
      bodyFormData.append("p_pincode", formData.Pincode);
      bodyFormData.append("p_country", formData.p_country);

      bodyFormData.append("parent[0][parent_type]", "father");
      bodyFormData.append("parent[0][name]", parentData.FathersName);
      bodyFormData.append("parent[0][email]", parentData.FathersEmail);
      bodyFormData.append("parent[0][mobile_no]", parentData.FathersNumber);
      bodyFormData.append(
        "parent[0][occupation]",
        parentData.FathersOccupation
      );
      bodyFormData.append("parent[0][relation]", "");
      bodyFormData.append("parent[0][describe_relation]", "");
      bodyFormData.append("parent[0][is_primary]", checkboxes.father);

      bodyFormData.append("parent[1][parent_type]", "Mother");
      bodyFormData.append("parent[1][name]", parentData.MothersName);
      bodyFormData.append("parent[1][email]", parentData.MothersEmail);
      bodyFormData.append("parent[1][mobile_no]", parentData.MothersNumber);
      bodyFormData.append(
        "parent[1][occupation]",
        parentData.MothersOccupation
      );
      bodyFormData.append("parent[1][relation]", "");
      bodyFormData.append("parent[1][describe_relation]", "");
      bodyFormData.append("parent[1][is_primary]", checkboxes.mother);

      bodyFormData.append("parent[2][parent_type]", "Guardian");
      bodyFormData.append("parent[2][name]", parentData.GuardianName);
      bodyFormData.append("parent[2][email]", parentData.GuardianEmail);
      bodyFormData.append("parent[2][mobile_no]", parentData.GuardianNumber);
      bodyFormData.append(
        "parent[2][occupation]",
        parentData.GuardianOccupation
      );
      bodyFormData.append("parent[2][relation]", parentData.GuardianRelation);
      bodyFormData.append(
        "parent[2][describe_relation]",
        parentData.DescribedRelation
      );
      bodyFormData.append("parent[2][is_primary]", checkboxes.guardian);

      bodyFormData.append("whatsup_no", otherData.WhatsappNumber);
      bodyFormData.append("identification_mark", otherData.identificationMark);
      bodyFormData.append("is_hostel_accomodation", accomadation);
      bodyFormData.append("sibling_name", otherData.SiblingsName);
      bodyFormData.append("sibling_admno", otherData.SiblingsAdissionNo);
      bodyFormData.append("extra_curricular_activities", otherData.ExtraCaricularActivity);
      bodyFormData.append("career_aims", otherData.CareerAims);

      bodyFormData.append("board", markData.Board);
      bodyFormData.append("language", icseCourse);
      bodyFormData.append("english", markData.MarkiNEnglish);
      bodyFormData.append("malayalam", markData.MarkiNLanguage);
      bodyFormData.append("malayalam2", markData.MarkiNLanguageII);
      bodyFormData.append("maths", markData.MarkiNMaths);
      bodyFormData.append("physics", markData.MarkiNPhysics);
      bodyFormData.append("cheistry", markData.MarkiNChemistry);
      bodyFormData.append("biology", markData.MarkiNBiology);
      bodyFormData.append("social_science", markData.MarkiNSocialScience);
      bodyFormData.append(
        "computer-application",
        markData.MarkiNComputerApplication
      );
      bodyFormData.append("hindi", markData.MarkiNHindi);

      selectInputs.map((course, index) => {
        bodyFormData.append(`course[${index}][course_option]`, index);
        bodyFormData.append(`course[${index}][display_order]`, course);
      });
      const response = await axios.post(
        "https://educationerp.in/pre_reg/index.php/Add_Pre_Registration",
        bodyFormData
      );

  
      if (response?.statusText === "OK") {
        setStudentId(response?.data.data)
      
       
        setData(5)
      }
    } catch (error) {
      console.error("Error fetching Course:", error);
    }
  };

  const handlePrevButton4 = () => {
    if (
      formData.classOfAdmission === "13" ||
      formData.classOfAdmission === "14"
    ) {
      setData(3);
     
    } else {
      setData(2);
    }
  };



  const handleData = () => {
    switch (datas) {
      case 1:
        return (
          <AdmissionForm
            formData={formData}
            setFormData={setFormData}
            change={handleInputChange}
            Submit={handleSubmit}
            GenderSelect={GenderSelect}
            gender={gender}
            year={year}
            categeory={categeory}
            CategeorySelect={CategeorySelect}
            selectedCategory={selectedCategory}
            YearSelect={YearSelect}
            Country={countries}
            Religion={religions}
            Class={classOfAdmission}
            SelectedClass={formData.classOfAdmission}
            setcheckadhaar={setcheckadhaar}
          />
        );
      case 2:
        return (
          <ParentDetials
            SelectedClass={formData.classOfAdmission}
            parentData={parentData}
            setParentData={setParentData}
            change={handleInputChange2}
            Next={handleNextButton}
            Previous={handlePrevButton}
            checkboxes={checkboxes}
            checkboxData={handleCheckboxClick}
            isOpen={alertShow}
            onClose={() => setalertShow(false)}
            setemailVaid={setemailVaid}
            setcheckNumber={setcheckNumber}
          />
        );
      case 3:
        return (
          <MarkSection
            markData={markData}
            change={handleInputChange3}
            Next={handleNextButton3}
            Previous={handlePrevButton3}
            icseCourse={icseCourse}
            IcseCoursefunction={IcseCourse}
            selectInputs={selectInputs}
            handleCategoryTypeChange={handleCategoryTypeChange}
     
            options={options}
         
            selectCourse={selectCourse}
          />
        );

      case 4:
        return (
          <OthersSection
            otherData={otherData}
            setOtherData={setOtherData}
            accomadationSelect={accomadationSelect}
            Relatives={Relatives}
            accomadation={accomadation}
            relatives={relatives}
            change={handleInputChange4}
            Submit={handleSubmitButton}
            Previous={handlePrevButton4}
            SelectedClass={formData.classOfAdmission}
         
          />
        );
case 5:
  return(
    <Submited
    studentId={studentId}
    />
  )
      default:
        console.log("Unknown option selected");
    }
  };
  return <div>{handleData()}</div>;
}

export default Main;
