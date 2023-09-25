import { CDBCard, CDBCardBody, CDBContainer, CDBDataTable, CDBRow, CDBCol } from 'cdbreact';
import React, { useState } from 'react'
import Ledgermodal from '../../Modal/Ledgermodal';

const Ledgerpage = () => {
    const [showModal, setShowModal] = useState(false)
    const data = () => {
        // if (!Array.isArray(Company)) {
        //     return {
        //         columns: [],
        //         rows: [],
        //     };
        // }
        return {
            columns: [
                {
                    label: 'No',
                    field: 'No',
                    width: 100,
                },
                {
                    label: 'Name',
                    field: 'Name',
                    width: 200,
                },
                {
                    label: 'Opening Balance',
                    field: 'Balance',
                    width: 150,
                },
               
                {
                    label: 'option',
                    field: 'editButton',
                    width: 100,
                },
                {
                    label: 'option',
                    field: 'deleteButton',
                    width: 100,
                },
            ],
            rows: [
                {
                    No: 1,
                    Name: 'ABC Company',
                    Balance: '123-456-7890',
                    editButton: (
                        <button
                          
                            style={{ cursor: 'pointer' }}
                            className="btn btn-primary btn-sm"
                        >
                            Edit
                        </button>
                    ),
                    deleteButton: (
                        <button
                            style={{ cursor: 'pointer' }} 
                            className="btn btn-danger btn-sm"
                        >
                            Delete
                        </button>
                    ),
                },
                {
                    No: 2,
                    Name: 'XYZ Corporation',
                    Balance: '987-654-3210',
                    editButton: (
                        <button
                          
                            style={{ cursor: 'pointer' }}
                            className="btn btn-primary btn-sm"
                        >
                            Edit
                        </button>
                    ),
                    deleteButton: (
                        <button
                            style={{ cursor: 'pointer' }} 
                            className="btn btn-danger btn-sm"
                        >
                            Delete
                        </button>
                    ),
                },
            ]
        };
    }
    return (
        <>
            <div className='container-fluid p-5' style={{ height: '100vh', overflowY: 'auto' }}>
                {/* Invoice Heading */}
                <div className='mb-4'>
                    <h1 className='text-center mb-3'>Manage Your Ledger</h1>
                    <p className='text-center text-muted'>
                        Welcome to the Company Management Dashboard.</p>
                </div>
                {/*  */}
                <div className='text-center mb-3'>
                    <button className='btn btn-large' onClick={() => setShowModal(true)} style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>Add Ledger</button>
                </div>

                <CDBContainer>
                    <CDBCard>
                        <CDBCardBody>
                            <CDBDataTable
                                responsive
                                striped
                                bordered
                                hover
                                scrollY
                                maxHeight="50vh"
                                data={data()}
                                materialSearch
                            />
                        </CDBCardBody>
                    </CDBCard>
                </CDBContainer>
            </div>
            {showModal && <Ledgermodal showModal={showModal} setShowModal={setShowModal}/>}

        </>
    )
}

export default Ledgerpage
// import React from 'react';
// import { CDBCard, CDBCardBody, CDBDataTable, CDBRow, CDBCol, CDBContainer } from 'cdbreact';

// const Ledgerpage = () => {
//   function testClickEvent(param) {
//     alert('Row Click Event');
//   }

//   const data = () => {
//     return {
//       columns: [
//         {
//           label: 'Name',
//           field: 'name',
//           width: 150,
//           attributes: {
//             'aria-controls': 'DataTable',
//             'aria-label': 'Name',
//           },
//         },
//         {
//           label: 'Position',
//           field: 'position',
//           width: 270,
//         },
//         {
//           label: 'Office',
//           field: 'office',
//           width: 200,
//         },
//         {
//           label: 'Age',
//           field: 'age',
//           sort: 'asc',
//           width: 100,
//         },
//         {
//           label: 'Start date',
//           field: 'date',
//           sort: 'disabled',
//           width: 150,
//         },
//         {
//           label: 'Salary',
//           field: 'salary',
//           sort: 'disabled',
//           width: 100,
//         },
//       ],
//       rows: [
//         {
//           name: 'Tiger Nixon',
//           position: 'System Architect',
//           office: 'Edinburgh',
//           age: '61',
//           date: '2011/04/25',
//           salary: '$320',
//           clickEvent: () => testClickEvent(1),
//         },
//         {
//           name: 'Garrett Winters',
//           position: 'Accountant',
//           office: 'Tokyo',
//           age: '63',
//           date: '2011/07/25',
//           salary: '$170',
//         },
//         {
//           name: 'Ashton Cox',
//           position: 'Junior Technical Author',
//           office: 'San Francisco',
//           age: '66',
//           date: '2009/01/12',
//           salary: '$86',
//         },
//         {
//           name: 'Cedric Kelly',
//           position: 'Senior Javascript Developer',
//           office: 'Edinburgh',
//           age: '22',
//           date: '2012/03/29',
//           salary: '$433',
//         },
//         {
//           name: 'Airi Satou',
//           position: 'Accountant',
//           office: 'Tokyo',
//           age: '33',
//           date: '2008/11/28',
//           salary: '$162',
//         },
//         {
//           name: 'Brielle Williamson',
//           position: 'Integration Specialist',
//           office: 'New York',
//           age: '61',
//           date: '2012/12/02',
//           salary: '$372',
//         }
//       ],
//     };
//   };
//   return (
//     <CDBContainer>
//       <CDBCard>
//         <CDBCardBody>
//           <CDBDataTable
//             striped
//             bordered
//             hover
//             scrollY
//             maxHeight="50vh"
//             data={data()}
//             materialSearch
//           />
//         </CDBCardBody>
//       </CDBCard>
//     </CDBContainer>
//   );
// };

// export default Ledgerpage;