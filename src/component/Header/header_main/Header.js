import './header.css'
import Header_list_up from '../header_list_up/Header_list_up'
import Header_list_down from '../header_list_down/Header_list_down'
import Header_last from '../header_last/Header_last'

function header() {

    return (
        <div id="header">
            <div className="container-header">
                <Header_list_up></Header_list_up>
                <Header_list_down></Header_list_down>
            </div>
            <Header_last></Header_last>
        </div>
    )
}

export default header