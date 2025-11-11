


const DeleteConfirmModal = ({close,confirm}) => {
  
    return (
      <section className="top-0 z-50 flex items-center justify-center bottom-0 left-0 right-0 fixed bg-neutral-800 bg-opacity-60">
          <div className=" bg-white  p-4 rounded "  >
          <div className=" font-semibold">
            <div className=" text-red-600 text-center">
              <h2>Delete Confirmation</h2>
            </div>
            <div className=" text-red-800 py-2">
              <p>Are you sure you want to delete this department?</p>
            </div>
            <div className=" flex justify-between items-start">
              <button onClick={close} className=" text-primary-200 border hover:text-white  border-primary-200 hover:bg-primary-200 px-4 py-2 rounded">
                Cancel
              </button>
              <button className="text-red-500 border border-red-500 hover:text-white hover:bg-red-500 px-4 py-2 rounded" onClick={confirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default DeleteConfirmModal
  