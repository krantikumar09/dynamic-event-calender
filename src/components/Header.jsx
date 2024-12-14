import ExportEvents from "./ExportEvent"

const Header = () => {
  return (
    <div className='px-4 py-2 mb-4 flex items-center justify-between shadow-md'>
        <h4>Event Manager</h4>
        <ExportEvents/>
    </div>
  )
}

export default Header