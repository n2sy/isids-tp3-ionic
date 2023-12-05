import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentDate;
  allTasks = [];
  showAddButton = true;
 

  constructor(private http : HttpClient, private alertController : AlertController) {}

  toggleShowAddButton() {
    this.showAddButton = !this.showAddButton;
  }

  addNewTask(iValue) {
    console.log(Date.now);
    
    const newTask = {
      text : iValue,
      date : new Date(),
      checked : false
    };
    this.http.post('https://ng-tasks-c6b03.firebaseio.com/Tasks.json', newTask).subscribe(
      {
        next : (response) => {
          alert("Task Added Successfully");
          this.getAllTasks();
        },
        error : (err) => {
          console.log(err);
          
        }
      }
    )

    this.toggleShowAddButton();
  }

  getAllTasks() {
    this.http.get('https://ng-tasks-c6b03.firebaseio.com/Tasks.json').subscribe(
      {
        next : (response) => {
          console.log(response);
          this.allTasks = [];
          for (const key in response) {
            
            this.allTasks.push({id : key, ...response[key]});

          }
          console.log(this.allTasks);
          

          
        },
        error : (err) => {
          console.log(err);
          
        }
      }
    )
  }

  async presentAlert(id) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure to delete this task ?',
      buttons: ['No', {
        text : "Yes",
        handler : () => {
          this.http.delete(`https://ng-tasks-c6b03.firebaseio.com/Tasks/${id}.json`).subscribe(
            {
              next : (response) => {
                console.log(response);
                this.getAllTasks();
                
                
              },
              error :(err) => {
                console.log(err);
                
              }
            }
          )
        }
      }],
    });

    await alert.present();
  }

  ngOnInit() {
    this.currentDate = new Date();
    this.getAllTasks();

    
  }
  }
