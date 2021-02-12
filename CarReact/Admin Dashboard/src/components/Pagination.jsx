import { Button2 } from './Button'

export  function Pagination(props) {

    const numberOfPage = Math.ceil(props.NumberOfItemsInDB / props.NumberToShow);
    const skip =[]
    for (let i = 0; i < numberOfPage; i++) {
        skip[i] = i * props.NumberToShow;
    }

    return (
        <ul className="pagination justify-content-center">
            {
                skip.map((number, index) => {
                    return (
                        <li className="page-item">
                        <Button2 className="page-link" handelClick={props.handelClick} key={index} parameter={number} name={index+1} />
                        </li >
                    )
                })
            }
        </ul >
    )
}


   // <ul class="pagination justify-content-center" *ngIf= "furnitures.length > 0 && isLoaded" >
    //         <li class="page-item"><a class="page-link" [class.block]="skip == 0"
    //             routerLink="/partfurniture/{{ indexLink[0]}}">Previous</a></li >

    //         <li class="page-item" * ngFor="let index of  numberOfPageBegin; let currentIndex = index;" >
    //             <a class="page-link" [class.bk] = "skip == currentIndex"
    //     routerLink = "/partfurniture/{{currentIndex}}" > {{ currentIndex + 1 }
    // }</a >
    //     </li >

    //     <li class="page-item"><a class="page-link" [class.block]="skip == numberOfPageBegin.length-1"
    //             routerLink="/partfurniture/{{ indexLink[1]}}">Next</a></li >
    // </ul >