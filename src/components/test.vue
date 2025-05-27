<template>
  <div class="flex space-y-4 flex-col p-6">
    <h1 class="text-2xl font-bold mb-6">Modal Component Examples</h1>

    <!-- Basic Modal Examples -->
    <div class="space-y-3">
      <h2 class="text-lg font-semibold">Basic Modal Examples</h2>
      <div class="flex gap-3 flex-wrap">
        <Button class="btn btn-primary" @click="showBasicModal">Component Modal</Button>
        <Button class="btn" @click="showFunctionModal">Function Modal</Button>
        <Button class="btn" @click="showDraggableModal">Draggable Modal</Button>
        <Button class="btn" @click="showLargeModal">Large Modal</Button>
        <Button class="btn" @click="showCustomSizeModal">Custom Size Modal</Button>
      </div>
    </div>

    <!-- Message Type Modals -->
    <div class="space-y-3">
      <h2 class="text-lg font-semibold">Message Type Modals</h2>
      <div class="flex gap-3 flex-wrap">
        <Button class="btn btn-success" @click="showSuccessModal">Success</Button>
        <Button class="btn btn-destructive" @click="showErrorModal">Error</Button>
        <Button class="btn btn-warning" @click="showWarningModal">Warning</Button>
        <Button class="btn btn-info" @click="showInfoModal">Info</Button>
      </div>
    </div>

    <!-- Confirm Modals -->
    <div class="space-y-3">
      <h2 class="text-lg font-semibold">Confirm Modals</h2>
      <div class="flex gap-3 flex-wrap">
        <Button class="btn" @click="showConfirmModal">Confirm Dialog</Button>
        <Button class="btn" @click="showAsyncConfirmModal">Async Confirm</Button>
        <Button class="btn btn-destructive" @click="showDeleteConfirmModal">Delete Confirm</Button>
      </div>
    </div>

    <!-- Advanced Examples -->
    <div class="space-y-3">
      <h2 class="text-lg font-semibold">Advanced Examples</h2>
      <div class="flex gap-3 flex-wrap">
        <Button class="btn" @click="showFormModal">Form Modal</Button>
        <Button class="btn" @click="showNestedModal">Nested Modal</Button>
        <Button class="btn" @click="showCustomFooterModal">Custom Footer</Button>
        <Button class="btn" @click="showNoMaskModal">No Mask Modal</Button>
        <Button class="btn" @click="showCenteredModal">Centered Modal</Button>
      </div>
    </div>



    <!-- Component Modal -->
    <Modal v-model="basicVisible" title="Component Modal Example" :width="800" draggable @ok="handleBasicOk"
      @cancel="handleBasicCancel">
      <div class="space-y-4">
        <p>This is a modal called through component method.</p>
        <div class="space-y-2">
          <label class="block text-sm font-medium">Select an option:</label>
          <Select v-model="selectedOption">
            <SelectTrigger class="w-[200px]">
              <SelectValue placeholder="Choose an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium">Input field:</label>
          <input v-model="inputValue" type="text" placeholder="Enter some text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="space-y-2">
          <p class="text-sm text-gray-600">Sample content with scrollable area:</p>
          <div class="max-h-40 overflow-y-auto border rounded p-3 bg-gray-50">
            <p v-for="i in 20" :key="i" class="mb-2">
              Line {{ i }}: This is sample content to demonstrate scrollable area within the modal.
            </p>
          </div>
        </div>
      </div>
    </Modal>

    <!-- Form Modal -->
    <Modal v-model="formVisible" title="User Registration Form" :width="600" @ok="handleFormSubmit"
      @cancel="handleFormCancel">
      <form @submit.prevent="handleFormSubmit" class="space-y-4">
        <div class="space-y-2">
          <label class="block text-sm font-medium">Full Name *</label>
          <input v-model="formData.name" type="text" required placeholder="Enter your full name"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium">Email *</label>
          <input v-model="formData.email" type="email" required placeholder="Enter your email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium">Phone</label>
          <input v-model="formData.phone" type="tel" placeholder="Enter your phone number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium">Department</label>
          <Select v-model="formData.department">
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="hr">Human Resources</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium">Notes</label>
          <textarea v-model="formData.notes" rows="3" placeholder="Additional notes..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
      </form>
    </Modal>

  </div>
</template>

<script setup>
import { createVNode, ref, reactive } from 'vue';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Modal, useModal } from './modal';
import { X, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-vue-next';

// Basic Modal State
const basicVisible = ref(false);
const formVisible = ref(false);
const selectedOption = ref('');
const inputValue = ref('');

// Form Data
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  department: '',
  notes: ''
});

// Basic Modal Functions
function showBasicModal() {
  basicVisible.value = true;
}

function handleBasicOk() {
  console.log('Basic modal confirmed');
  console.log('Selected option:', selectedOption.value);
  console.log('Input value:', inputValue.value);
  basicVisible.value = false;
}

function handleBasicCancel() {
  console.log('Basic modal cancelled');
  basicVisible.value = false;
}

// Function Modal Examples
function showFunctionModal() {
  useModal({
    title: 'Function Modal Example',
    content: 'This modal is created using the function-based approach. It provides a simple way to display information or get user confirmation.',
    draggable: true,
    maskClosable: true,
    afterClose: () => {
      console.log('Function modal afterClosed');
    },
    onOk() {
      console.log('Function modal confirmed');
    },
    onCancel() {
      console.log('Function modal cancelled');
    }
  });
}

function showDraggableModal() {
  useModal({
    title: 'Draggable Modal',
    content: createVNode('div', { class: 'space-y-3' }, [
      createVNode('p', null, 'This modal can be dragged around the screen!'),
      createVNode('p', null, 'Try clicking and dragging the header to move it.'),
      createVNode('div', { class: 'p-3 bg-blue-50 rounded border-l-4 border-blue-400' }, [
        createVNode('p', { class: 'text-sm text-blue-700' }, '💡 Tip: The modal will stay within the viewport boundaries.')
      ])
    ]),
    draggable: true,
    width: 500,
    onOk: () => console.log('Draggable modal confirmed'),
    onCancel: () => console.log('Draggable modal cancelled')
  });
}

function showLargeModal() {
  useModal({
    title: 'Large Modal Example',
    content: createVNode('div', { class: 'space-y-4' }, [
      createVNode('p', null, 'This is a large modal with extensive content.'),
      createVNode('div', { class: 'grid grid-cols-2 gap-4' }, [
        createVNode('div', { class: 'p-4 border rounded' }, [
          createVNode('h4', { class: 'font-semibold mb-2' }, 'Left Column'),
          createVNode('p', { class: 'text-sm text-gray-600' }, 'Content for the left side of the modal.')
        ]),
        createVNode('div', { class: 'p-4 border rounded' }, [
          createVNode('h4', { class: 'font-semibold mb-2' }, 'Right Column'),
          createVNode('p', { class: 'text-sm text-gray-600' }, 'Content for the right side of the modal.')
        ])
      ]),
      ...Array.from({ length: 15 }, (_, i) =>
        createVNode('p', { key: i }, `Paragraph ${i + 1}: This demonstrates scrollable content within a large modal.`)
      )
    ]),
    width: 1000,
    height: 600,
    draggable: true,
    onOk: () => console.log('Large modal confirmed'),
    onCancel: () => console.log('Large modal cancelled')
  });
}

function showCustomSizeModal() {
  useModal({
    title: 'Custom Size Modal',
    content: 'This modal has custom width and height dimensions.',
    width: 400,
    height: 300,
    draggable: true,
    onOk: () => console.log('Custom size modal confirmed'),
    onCancel: () => console.log('Custom size modal cancelled')
  });
}

// Message Type Modals
function showSuccessModal() {
  Modal.success({
    title: 'Operation Successful',
    content: createVNode('div', { class: 'space-y-3' }, [
      createVNode('p', null, 'Your data has been saved successfully!'),
      createVNode('ul', { class: 'list-disc list-inside text-sm text-gray-600' }, [
        createVNode('li', null, 'All changes have been applied'),
        createVNode('li', null, 'Notifications have been sent'),
        createVNode('li', null, 'You can continue with your work')
      ])
    ]),
    draggable: true,
    onOk: () => console.log('Success modal confirmed')
  });
}

function showErrorModal() {
  Modal.error({
    title: 'Operation Failed',
    content: createVNode('div', { class: 'space-y-3' }, [
      createVNode('p', null, 'An error occurred while processing your request.'),
      createVNode('div', { class: 'p-3 bg-red-50 rounded border-l-4 border-red-400' }, [
        createVNode('p', { class: 'text-sm text-red-700 font-medium' }, 'Error Details:'),
        createVNode('p', { class: 'text-sm text-red-600' }, 'Network connection timeout. Please check your internet connection and try again.')
      ])
    ]),
    draggable: true,
    onOk: () => console.log('Error modal confirmed')
  });
}

function showWarningModal() {
  Modal.warning({
    title: 'Warning: Action Required',
    content: createVNode('div', { class: 'space-y-3' }, [
      createVNode('p', null, 'Please review the following before proceeding:'),
      createVNode('ul', { class: 'list-disc list-inside text-sm text-amber-700' }, [
        createVNode('li', null, 'This action cannot be undone'),
        createVNode('li', null, 'All related data will be affected'),
        createVNode('li', null, 'Make sure you have a backup')
      ])
    ]),
    draggable: true,
    onOk: () => console.log('Warning modal confirmed')
  });
}

function showInfoModal() {
  Modal.info({
    title: 'Information',
    content: createVNode('div', { class: 'space-y-3' }, [
      createVNode('p', null, 'Here is some important information:'),
      createVNode('div', { class: 'p-3 bg-blue-50 rounded' }, [
        createVNode('h4', { class: 'font-semibold text-blue-800 mb-2' }, 'System Update'),
        createVNode('p', { class: 'text-sm text-blue-700' }, 'The system will undergo maintenance on Sunday from 2:00 AM to 4:00 AM. Please save your work before this time.')
      ])
    ]),
    draggable: true,
    onOk: () => console.log('Info modal confirmed')
  });
}

// Confirm Modals
function showConfirmModal() {
  Modal.confirm({
    title: 'Confirm Action',
    content: 'Are you sure you want to proceed with this action?',
    draggable: true,
    onOk: () => {
      console.log('Action confirmed');
    },
    onCancel: () => {
      console.log('Action cancelled');
    }
  });
}

function showAsyncConfirmModal() {
  Modal.confirm({
    title: 'Async Confirm',
    content: 'This will perform an asynchronous operation. Please wait...',
    draggable: true,
    onOk: async () => {
      // Simulate async operation
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Async operation completed');
          resolve();
        }, 2000);
      });
    },
    onCancel: () => {
      console.log('Async operation cancelled');
    }
  });
}

function showDeleteConfirmModal() {
  Modal.confirm({
    title: 'Delete Confirmation',
    content: createVNode('div', { class: 'space-y-3' }, [
      createVNode('p', null, 'Are you sure you want to delete this item?'),
      createVNode('div', { class: 'p-3 bg-red-50 rounded border-l-4 border-red-400' }, [
        createVNode('p', { class: 'text-sm text-red-700 font-medium' }, '⚠️ This action is irreversible'),
        createVNode('p', { class: 'text-sm text-red-600' }, 'All associated data will be permanently removed.')
      ])
    ]),
    draggable: true,
    okText: 'Delete',
    cancelText: 'Keep',
    onOk: () => {
      console.log('Item deleted');
    },
    onCancel: () => {
      console.log('Deletion cancelled');
    }
  });
}

// Advanced Examples
function showFormModal() {
  formVisible.value = true;
}

function handleFormSubmit() {
  console.log('Form submitted:', formData);
  // Validate form
  if (!formData.name || !formData.email) {
    Modal.warning({
      title: 'Validation Error',
      content: 'Please fill in all required fields.',
      onOk: () => console.log('Validation warning confirmed')
    });
    return;
  }

  formVisible.value = false;

  // Show success message
  Modal.success({
    title: 'Registration Successful',
    content: `Welcome ${formData.name}! Your registration has been completed.`,
    onOk: () => console.log('Registration success confirmed')
  });
}

function handleFormCancel() {
  formVisible.value = false;
}

function showNestedModal() {
  useModal({
    title: 'Parent Modal',
    content: createVNode('div', { class: 'space-y-4' }, [
      createVNode('p', null, 'This is the parent modal.'),
      createVNode('button', {
        class: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
        onClick: () => {
          Modal.info({
            title: 'Child Modal',
            content: 'This is a nested modal opened from the parent modal.',
            okText: 'destroyAll',
            draggable: true,
            onOk: () => Modal.destroyAll()
          });
        }
      }, 'Open Nested Modal')
    ]),
    draggable: true,
    onOk: () => console.log('Parent modal confirmed'),
    onCancel: () => console.log('Parent modal cancelled')
  });
}

function showCustomFooterModal() {
  useModal({
    title: 'Custom Footer Modal',
    content: 'This modal has custom footer buttons.',
    draggable: true,
    footer: createVNode('div', { class: 'flex justify-between w-full' }, [
      createVNode('div', { class: 'flex gap-2' }, [
        createVNode('button', {
          class: 'px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300',
          onClick: () => console.log('Help clicked')
        }, 'Help'),
        createVNode('button', {
          class: 'px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600',
          onClick: () => console.log('Save Draft clicked')
        }, 'Save Draft')
      ]),
      createVNode('div', { class: 'flex gap-2' }, [
        createVNode('button', {
          class: 'px-4 py-2 border rounded hover:bg-gray-50',
          onClick: () => {
            console.log('Cancel clicked');
          }
        }, 'Cancel'),
        createVNode('button', {
          class: 'px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600',
          onClick: () => {
            console.log('Publish clicked');
          }
        }, 'Publish')
      ])
    ]),
    showFooter: false, // Disable default footer
    onCancel: () => console.log('Custom footer modal cancelled')
  });
}

function showNoMaskModal() {
  useModal({
    title: 'No Mask Modal',
    content: 'This modal has no background mask. You can interact with the background.',
    draggable: true,
    mask: false,
    onOk: () => console.log('No mask modal confirmed'),
    onCancel: () => console.log('No mask modal cancelled')
  });
}

function showCenteredModal() {
  useModal({
    title: 'Centered Modal',
    content: 'This modal is vertically centered on the screen.',
    draggable: true,
    centered: true,
    onOk: () => console.log('Centered modal confirmed'),
    onCancel: () => console.log('Centered modal cancelled')
  });
}

// Control Functions
function destroyAllModals() {
  Modal.destroyAll();
  console.log('All modals destroyed');
}
</script>

<style scoped>
@import "tailwindcss";

.btn {
  @apply px-4 py-2 rounded-md font-medium transition-colors duration-200;
}

.btn-primary {
  @apply bg-blue-500 text-white hover:bg-blue-600;
}

.btn-success {
  @apply bg-green-500 text-white hover:bg-green-600;
}

.btn-destructive {
  @apply bg-red-500 text-white hover:bg-red-600;
}

.btn-warning {
  @apply bg-amber-500 text-white hover:bg-amber-600;
}

.btn-info {
  @apply bg-blue-400 text-white hover:bg-blue-500;
}

.btn-outline {
  @apply border border-gray-300 bg-white text-gray-700 hover:bg-gray-50;
}
</style>