import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  NgForm,
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';

interface SideNavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    standalone: false
})
export class AdminComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('profileMenuTrigger') profileMenuTrigger!: MatMenuTrigger;
  @ViewChild('navbar', { static: false, read: ElementRef }) navbar!: ElementRef;
  @ViewChild('sidebar', { static: false, read: ElementRef })
  sidebar!: ElementRef;
  @ViewChild('addNewStudentForm') addNewStudentForm!: NgForm;
  @ViewChild('addNewAdminForm') addNewAdminForm!: NgForm;
  // @ViewChild('editProfileForm') editProfileForm!: NgForm; // Add ViewChild for the edit form
  @ViewChild('editNoticeForm') editNoticeForm!: NgForm;
  @ViewChild('editStudentForm') editStudentForm!: NgForm;
  @ViewChild('editAdminForm') editAdminForm!: NgForm;

  private openEditNoticeSubscription: Subscription | undefined;
  private openEditStudentSubscription: Subscription | undefined;
  private openEditAdminSubscription: Subscription | undefined;

  isDarkMode = false;
  currentLanguage = 'en';
  profilePicUrl: any;
  hidePassword = true;
  hideConfirmPassword = true;
  newUser: any = {
    username: '',
    studentId: '',
    email: '',
    phone: '',
    gender: '',
    cafeStatus: '',
    password: '',
    confirmPassword: '',
    department: '',
  };
  updatedUser: any = {
    username: '',
    studentId: '',
    email: '',
    phone: '',
    gender: '',
    cafeStatus: '',
    password: '',
    confirmPassword: '',
    department: '',
  };
  newNotice: any = {
    title: '',
    description: '',
    category: '',
    // phone: '',
    // gender: '',
    // cafeStatus: '',
    // password: '',
    // confirmPassword: '',
    // department: '',
  };
  selectedProfilePic: File | null = null;
  userProfile: any = {};

  // Use FormBuilder to define the form group
  addNewStudentFormGroup: FormGroup;
  addNewAdminFormGroup: FormGroup;
  addNewNoticeFormGroup: FormGroup;
  editNoticeFormGroup: FormGroup;
  editStudentFormGroup: FormGroup;
  editAdminFormGroup: FormGroup;
  // editProfileFormGroup: FormGroup;
  account: any = {};

  public fromEditProfile: boolean = false;

  sideNavItems: any[] = [];

  constructor(
    public dialog: MatDialog,
    private renderer: Renderer2,
    private translateService: TranslateService,
    public modalService: ModalService,
    private router: Router,
    private authService: AuthService,
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder // Inject FormBuilder
  ) {
    // Construct the form group in the constructor
    this.addNewStudentFormGroup = this.fb.group(
      {
        username: ['', Validators.required],
        studentId: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Example: 10-digit phone number
        gender: ['', Validators.required],
        cafeStatus: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        department: ['', Validators.required],
        profilePic: [''], // Add a form control for the profile picture
      },
      { validators: this.passwordMatchValidator }
    ); // Custom validator for password matching

    // Construct the form group in the constructor
    this.addNewAdminFormGroup = this.fb.group(
      {
        username: ['', Validators.required],
        studentId: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Example: 10-digit phone number
        gender: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        userType: ['', Validators.required],
        profilePic: [''], // Add a form control for the profile picture
      },
      { validators: this.passwordMatchValidator }
    ); // Custom validator for password matching

    // Construct the form group in the constructor
    this.addNewNoticeFormGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', [Validators.required]],
    });

    this.editStudentFormGroup = this.fb.group({
      username: ['', Validators.required],
      studentId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Example: 10-digit phone number
      gender: ['', Validators.required],
      cafeStatus: ['', Validators.required],
      department: ['', Validators.required],
      profilePic: [''], // Add a form control for the profile picture
    });

    this.editAdminFormGroup = this.fb.group({
      username: ['', Validators.required],
      studentId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Example: 10-digit phone number
      gender: ['', Validators.required],
      userType: ['', Validators.required],
      profilePic: [''], // Add a form control for the profile picture
    });

    this.editNoticeFormGroup = this.fb.group({
      // Initialize edit form
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fromEditProfile = false;
    localStorage.setItem('fromEditProfile', 'false');

    this.setAccount();
    this.currentLanguage = localStorage.getItem('currentLanguage') || 'en';
    this.translateService.use(this.currentLanguage);
    switch (this.account.userType) {
      case 'admin':
        this.sideNavItems = [
          { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
          { label: 'Cafe', icon: 'restaurant', route: '/admin/cafe' },
          { label: 'Gate', icon: 'meeting_room', route: '/admin/gate' },
          { label: 'School', icon: 'school', route: '/admin/school' },
          { label: 'Registrar', icon: 'how_to_reg', route: '/admin/registrar' },
        ];
        break;
      case 'cafe':
        this.sideNavItems = [
          { label: 'Scan QR Code', icon: 'qr_code_scanner', route: '/admin/cafescan' },
          { label: 'Cafe', icon: 'restaurant', route: '/admin/cafe' },
        ];
        break;
      case 'gate':
        this.sideNavItems = [
          { label: 'Scan QR Code', icon: 'qr_code_scanner', route: '/admin/gatescan' },
          { label: 'Gate', icon: 'meeting_room', route: '/admin/gate' },
        ];
        break;
      case 'school':
        this.sideNavItems = [
          { label: 'School', icon: 'school', route: '/admin/school' },
        ];
        break;
      case 'registrar':
        this.sideNavItems = [
          { label: 'Registrar', icon: 'how_to_reg', route: '/admin/registrar' },
        ];
        break;
      default:
        this.sideNavItems = [
          { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
          { label: 'Cafe', icon: 'restaurant', route: '/admin/cafe' },
          { label: 'Gate', icon: 'meeting_room', route: '/admin/gate' },
          { label: 'School', icon: 'school', route: '/admin/school' },
          { label: 'Registrar', icon: 'how_to_reg', route: '/admin/registrar' },
        ];
        break;
    }
    // this.initializeProfileForm()
    this.openEditNoticeSubscription = this.openEditNoticeSubscriptionMethod();
    this.openEditAdminSubscription = this.openEditAdminSubsciptionMethod();
    this.openEditStudentSubscription = this.openEditStudentSubsciptionMethod();
  }

  setAccount() {
    this.account = this.authService.getLoggedInUserDetails();
    // console.log(this.account);

  }

  openEditNoticeSubscriptionMethod() {
    return this.modalService.openEditNoticeModal.subscribe(
      (notice: any | null) => {
        if (notice) {
          // Populate the form with the notice data
          this.editNoticeFormGroup.patchValue({
            id: this.modalService.selectedNotice._id, // Get the ID from the service.
            title: notice.title,
            description: notice.description,
            category: notice.category,
          });
        } else {
          // Reset the form when the modal is closed.
          this.editNoticeFormGroup.reset();
        }
      }
    );
  }

  openEditAdminSubsciptionMethod() {
    return this.modalService.openEditProfileModal.subscribe(
      (profile: any | null) => {
        // Receive the Notice object or null
        if (profile) {
          // Populate the form with the profile data
          this.editAdminFormGroup.patchValue({
            // id: this.modalService.selectedAdmin.id, // Get the ID from the service.
            // id: this.account.id,
            username: profile.username,
            studentId: profile.studentId,
            email: profile.email,
            phone: profile.phone,
            gender: profile.gender,
            userType: profile.userType,
            profilePic: profile.profilePic,
          });
          this.profilePicUrl = profile.profilePic; // Set the profile picture URL
        } else {
          // Reset the form when the modal is closed.
          this.editAdminFormGroup.reset();
        }
      }
    );
  }

  openEditStudentSubsciptionMethod() {
    return this.modalService.openEditStudentModal.subscribe(
      (profile: any | null) => {
        if (profile) {
          // Populate the form with the profile data
          this.editStudentFormGroup.patchValue({
            id: this.modalService.selectedStudent.id, // Get the ID from the service.
            username: profile.username,
            studentId: profile.studentId,
            email: profile.email,
            phone: profile.phone,
            gender: profile.gender,
            cafeStatus: profile.cafeStatus,
            profilePic: profile.profilePic,
            department: profile.department,
          });
          this.profilePicUrl = profile.profilePic; // Set the profile picture URL
        } else {
          // Reset the form when the modal is closed.
          this.editStudentFormGroup.reset();
        }
      }
    );
  }

  ngAfterViewInit() {
    this.setSameBackgroundColor();
  }

  setSameBackgroundColor() {
    const navColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--primary-color');
    if (this.navbar && this.sidebar && navColor) {
      this.renderer.setStyle(
        this.navbar.nativeElement,
        'background-color',
        navColor.trim()
      );
      this.renderer.setStyle(
        this.sidebar.nativeElement,
        'background-color',
        navColor.trim()
      );
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme');
  }

  changeLanguage(lang: string) {
    this.currentLanguage = lang;
    localStorage.setItem('currentLanguage', lang);
    this.translateService.use(this.currentLanguage);
    console.log(`Language changed to ${lang}`);
  }

  openAccountDialog() {

    this.setAccount()
    localStorage.setItem('fromEditProfile', 'true');
    this.modalService.openEditProfile(this.account);
  }

  handleSecondaryAdd(): void {
    console.log('Secondary Add button clicked!');
  }

  // Custom validator function to check if password and confirmPassword match
  passwordMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  addNewStudent() {
    if (this.addNewStudentFormGroup.invalid) {
      this.snackBar.open(
        'Please fill in all required fields correctly.',
        'Close',
        {
          duration: 3000,
          verticalPosition: 'top',
        }
      );
      return;
    }

    // Prepare the data to send in the this.newUser format
    this.newUser = {
      username: this.addNewStudentFormGroup.get('username')?.value,
      studentId: this.addNewStudentFormGroup.get('studentId')?.value,
      email: this.addNewStudentFormGroup.get('email')?.value,
      phone: this.addNewStudentFormGroup.get('phone')?.value,
      gender: this.addNewStudentFormGroup.get('gender')?.value,
      cafeStatus: this.addNewStudentFormGroup.get('cafeStatus')?.value,
      password: this.addNewStudentFormGroup.get('password')?.value,
      confirmPassword:
        this.addNewStudentFormGroup.get('confirmPassword')?.value,
      department: this.addNewStudentFormGroup.get('department')?.value,
    };

    this.authService.registerNewUser(this.newUser, this.selectedProfilePic); // Send the data
    this.authService._response.subscribe((next:any) => {
      if(next.smallMessage == "OK") {
        this.addNewStudentFormGroup.reset();
      }
    })
  }
  editStudent() {
    if (this.editStudentFormGroup.invalid) {
      this.snackBar.open(
        'Please fill in all required fields correctly.',
        'Close',
        {
          duration: 3000,
          verticalPosition: 'top',
        }
      );
      return;
    }

    // Prepare the data to send in the this.newUser format
    this.updatedUser = {
      id: this.modalService.selectedStudent._id, // Get the ID from the service.
      username: this.editStudentFormGroup.get('username')?.value,
      studentId: this.editStudentFormGroup.get('studentId')?.value,
      email: this.editStudentFormGroup.get('email')?.value,
      phone: this.editStudentFormGroup.get('phone')?.value,
      gender: this.editStudentFormGroup.get('gender')?.value,
      cafeStatus: this.editStudentFormGroup.get('cafeStatus')?.value,
      password: this.editStudentFormGroup.get('password')?.value,
      confirmPassword: this.editStudentFormGroup.get('confirmPassword')?.value,
      department: this.editStudentFormGroup.get('department')?.value,
    };

    this.authService.updateUser(this.updatedUser, this.selectedProfilePic); // Send the data
    this.authService._response.subscribe((next:any) => {
      if(next.smallMessage == "OK") {
        this.editStudentFormGroup.reset();
      }
    })
  }
  onFileChange(e: any) {
    this.selectedProfilePic = e.target.files[0] || null;
    this.addNewStudentFormGroup
      .get('profilePic')
      ?.setValue(this.selectedProfilePic); // Update form control
    this.addNewAdminFormGroup
      .get('profilePic')
      ?.setValue(this.selectedProfilePic); // Update form control
    this.editStudentFormGroup
      .get('profilePic')
      ?.setValue(this.selectedProfilePic); // Update form control
    this.editAdminFormGroup
      .get('profilePic')
      ?.setValue(this.selectedProfilePic); // Update form control

    if (this.selectedProfilePic) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.profilePicUrl = event.target.result;
      };
      reader.readAsDataURL(this.selectedProfilePic);
    } else {
      this.profilePicUrl = null; // Clear the preview if no file is selected
    }
  }

  addNewAdmin() {
    if (this.addNewAdminFormGroup.invalid) {
      this.snackBar.open(
        'Please fill in all required fields correctly.',
        'Close',
        {
          duration: 3000,
          verticalPosition: 'top',
        }
      );
      return;
    }

    // Prepare the data to send in the this.newUser format
    this.newUser = {
      username: this.addNewAdminFormGroup.get('username')?.value,
      studentId: this.addNewAdminFormGroup.get('studentId')?.value,
      email: this.addNewAdminFormGroup.get('email')?.value,
      phone: this.addNewAdminFormGroup.get('phone')?.value,
      gender: this.addNewAdminFormGroup.get('gender')?.value,
      cafeStatus: this.addNewAdminFormGroup.get('cafeStatus')?.value,
      password: this.addNewAdminFormGroup.get('password')?.value,
      confirmPassword: this.addNewAdminFormGroup.get('confirmPassword')?.value,
      userType: this.addNewAdminFormGroup.get('userType')?.value,
    };

    this.authService.registerNewUser(this.newUser, this.selectedProfilePic); // Send the data
    this.authService._response.subscribe((next:any) => {
      if(next.smallMessage == "OK") {
        this.addNewAdminFormGroup.reset();
      }
    })

  }

  editAdmin() {
    if (this.editAdminFormGroup.invalid) {
      this.snackBar.open(
        'Please fill in all required fields correctly.',
        'Close',
        {
          duration: 3000,
          verticalPosition: 'top',
        }
      );
      return;
    }

    // Prepare the data to send in the this.newUser format
    this.updatedUser = {
      id: this.modalService.selectedAdmin.id || this.modalService.selectedAdmin._id , // Get the ID from the service.
      username: this.editAdminFormGroup.get('username')?.value,
      studentId: this.editAdminFormGroup.get('studentId')?.value,
      email: this.editAdminFormGroup.get('email')?.value,
      phone: this.editAdminFormGroup.get('phone')?.value,
      gender: this.editAdminFormGroup.get('gender')?.value,
      cafeStatus: this.editAdminFormGroup.get('cafeStatus')?.value,
      password: this.editAdminFormGroup.get('password')?.value,
      confirmPassword: this.editAdminFormGroup.get('confirmPassword')?.value,
      userType: this.editAdminFormGroup.get('userType')?.value,
    };

    // console.log(this.updatedUser);
    this.authService.updateUser(this.updatedUser, this.selectedProfilePic); // Send the data
    this.authService._response.subscribe((next:any) => {
      if(next.smallMessage == "OK") {
        console.log(next.smallMessage);

        this.editAdminFormGroup.reset();
      }
    })
  }

  addNewNotice() {
    if (this.addNewNoticeFormGroup.invalid) {
      this.snackBar.open(
        'Please fill in all required fields correctly.',
        'Close',
        {
          duration: 3000,
          verticalPosition: 'top',
        }
      );
      return;
    }

    // Prepare the data to send in the this.newUser format
    this.newNotice = {
      title: this.addNewNoticeFormGroup.get('title')?.value,
      description: this.addNewNoticeFormGroup.get('description')?.value,
      category: this.addNewNoticeFormGroup.get('category')?.value,
    };
    console.log(this.newNotice);

    this.dashboardService.addNotice(this.newNotice); // Send the data
    this.dashboardService._response.subscribe((next:any) => {
      if(next.smallMessage == "OK") {
        this.addNewNoticeFormGroup.reset();
      }
    })
  }
  editNotice() {
    if (this.editNoticeFormGroup.invalid) {
      this.snackBar.open(
        'Please fill in all required fields correctly.',
        'Close',
        {
          duration: 3000,
          verticalPosition: 'top',
        }
      );
      return;
    }

    const updatedNotice: any = {
      id: this.modalService.selectedNotice._id, // Get the ID from the service.
      title: this.editNoticeFormGroup.get('title')?.value,
      description: this.editNoticeFormGroup.get('description')?.value,
      category: this.editNoticeFormGroup.get('category')?.value,
    };

    this.dashboardService.updateNotice(updatedNotice);
    this.dashboardService._response.subscribe((next:any) => {
      if(next.smallMessage == "OK") {
        this.editNoticeFormGroup.reset();
      }
    })
  }
  ngOnDestroy(): any {
    // if (this.selectedAdminSubscription) {
    //   this.selectedAdminSubscription.unsubscribe();
    // }
    if (this.openEditNoticeSubscription) {
      // Unsubscribe
      this.openEditNoticeSubscription.unsubscribe();
    }
    if (this.openEditAdminSubscription) {
      // Unsubscribe
      this.openEditAdminSubscription.unsubscribe();
    }
    if (this.openEditStudentSubscription) {
      // Unsubscribe
      this.openEditStudentSubscription.unsubscribe();
    }
  }

  logout() {
    console.log('Logout clicked');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
